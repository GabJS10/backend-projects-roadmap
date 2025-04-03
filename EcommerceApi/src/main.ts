import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { join } from 'path';
import * as express from 'express';
import { existsSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ahora se usa process.cwd() para encontrar la carpeta correcta
  const uploadsPath = join(process.cwd(), 'uploads');
  console.log('Serving static files from:', uploadsPath);

  // Asegurar que Express sirva los archivos estáticos correctamente
  app.use('/uploads', express.static(uploadsPath));

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    express.json({
      verify: (req, res, buf) => {
        (req as any).rawBody = buf;
      },
    }),
  );

  await app.listen(PORT);
}
bootstrap();
