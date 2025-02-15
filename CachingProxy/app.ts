import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Request, Response } from 'express';
import morgan from 'morgan';
import zlib from 'zlib';
import { createClient } from 'redis';
const app = express();

app.use(morgan('dev'));

export const client = createClient({
  url: 'redis://localhost:6379',
});

client.connect().then(() => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.log('Redis Client Error', err);
});

app.use(async (req, res, next) => {
  const origin = process.argv[process.argv.length - 1];
  const cacheKey = `proxy:${origin}-${req.method}-${req.url}`;

  const cachedResponse = await client.get(cacheKey);
  if (cachedResponse) {
    res.header('X-Cache', 'HIT');
    res.send(JSON.parse(cachedResponse));
  } else {
    next();
  }
});

export const initServer = (PORT: number, origin: string) => {
  const proxyMiddleware = createProxyMiddleware<Request, Response>({
    target: origin,
    changeOrigin: true,
    followRedirects: true,
    selfHandleResponse: true,
    on: {
      proxyRes: async (proxyRes, req, res) => {
        let data = '';
        const cacheKey = `proxy:${origin}-${req.method}-${req.url}`;
        const contentEncoding = proxyRes.headers['content-encoding'];
        let responseStream: NodeJS.ReadableStream | null = null;

        try {
          responseStream = proxyRes.pipe(
            contentEncoding === 'gzip'
              ? zlib.createGunzip()
              : contentEncoding === 'deflate'
              ? zlib.createInflate()
              : contentEncoding === 'br'
              ? zlib.createBrotliDecompress()
              : null,
          );
          if (responseStream) {
            responseStream.on('data', (chunk) => {
              data += chunk.toString();
            });

            responseStream.on('end', async () => {
              await client.set(cacheKey, data, { EX: 3600 });
              res.header('X-Cache', 'MISS');
              res.send(JSON.parse(data));
            });
          } else {
            proxyRes.on('data', (chunk) => {
              data += chunk.toString();
            });

            proxyRes.on('end', async () => {
              res.header('X-Cache', 'MISS');
              await client.set(cacheKey, data, { EX: 3600 });
              res.send(data);
            });
          }
        } catch (error) {
          res.status(500).send('Error decompressing response');
        }
      },
    },
  });

  app.use('/', proxyMiddleware);

  app.listen(PORT, () => {
    console.log(`Caching proxy is running on http://localhost:${PORT}`);
  });
};

export default app;
