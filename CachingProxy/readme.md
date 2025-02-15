# Caching Proxy Server

A CLI-based caching proxy server that forwards HTTP requests to an origin server, caches the responses, and serves cached responses for subsequent identical requests. This project is part of the [Backend Roadmap](https://roadmap.sh/backend/projects) challenges.

## Features

- **Caching**: Responses from the origin server are cached in Redis for faster subsequent requests.
- **Compression Handling**: Automatically decompresses responses encoded with `gzip`, `deflate`, or `Brotli`.
- **Custom Headers**: Adds `X-Cache: HIT` or `X-Cache: MISS` headers to indicate whether the response came from the cache or the origin server.
- **CLI Interface**: Start the server or clear the cache using simple commands.
- **Redis Integration**: Uses Redis as the caching backend for efficient storage and retrieval of cached responses.

## Requirements

- Node.js (v16 or higher)
- Docker (for running Redis)
- Redis (optional, if not using Docker)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/caching-proxy.git
cd caching-proxy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Redis

#### Option 1: Using Docker (Recommended)

Run Redis using Docker Compose:

```bash
docker-compose up -d
```

This will start a Redis container on `localhost:6379`.

#### Option 2: Local Redis Installation

If you have Redis installed locally, start the Redis server:

```bash
redis-server
```

Ensure Redis is running on `localhost:6379`.

## Usage

### Start the Caching Proxy Server

Run the following command to start the caching proxy server:

```bash
node src/cli.js caching-proxy --port <PORT> --origin <ORIGIN_URL>
```

Example:

```bash
node src/cli.js caching-proxy --port 3000 --origin http://dummyjson.com
```

The proxy server will start listening on the specified port (e.g., `http://localhost:3000`).

### Clear the Cache

To clear all cached responses, run:

```bash
node src/cli.js caching-proxy --clear-cache
```

This will delete all keys stored in Redis under the `proxy:*` namespace.

### Test the Proxy

You can test the proxy using `curl` or any HTTP client like Postman.

#### First Request (Cache Miss)

```bash
curl -i http://localhost:3000/products
```

Response headers will include:

```
X-Cache: MISS
```

#### Subsequent Requests (Cache Hit)

```bash
curl -i http://localhost:3000/products
```

Response headers will include:

```
X-Cache: HIT
```

## Configuration

### CLI Options

| Option              | Description                                     | Required |
| ------------------- | ----------------------------------------------- | -------- |
| `-p, --port`        | Port to run the caching proxy server on         | Yes      |
| `-o, --origin`      | URL of the origin server to forward requests to | Yes      |
| `-c, --clear-cache` | Clear all cached responses                      | No       |

### Redis Connection

The proxy connects to Redis at `redis://localhost:6379`. If your Redis instance runs on a different host or port, update the connection URL in `src/app.ts`:

```typescript
export const client = createClient({
  url: 'redis://<REDIS_HOST>:<REDIS_PORT>',
});
```

## How It Works

1. **Incoming Request**: The proxy receives an HTTP request from the client.
2. **Cache Lookup**: The proxy checks Redis for a cached response using a unique key based on the request method and URL.
3. **Cache Hit**: If a cached response exists, it is returned to the client with the header `X-Cache: HIT`.
4. **Cache Miss**: If no cached response exists:
   - The request is forwarded to the origin server.
   - The response is cached in Redis.
   - The response is returned to the client with the header `X-Cache: MISS`.
5. **Compression Handling**: If the response is compressed (e.g., `gzip`, `deflate`, `Brotli`), it is decompressed before being cached and sent to the client.

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built as part of the [Backend Roadmap](https://roadmap.sh/backend/projects) challenges.
- Thanks to the creators of [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) and [Redis](https://redis.io/) for their excellent tools.
