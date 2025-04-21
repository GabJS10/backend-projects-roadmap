import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //encontrar carpeta uploads
  const uploadsPath = join(process.cwd(), 'uploads');

  //serve static files
  app.use("/uploads", express.static(uploadsPath));

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = new ConfigService();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const PORT = configService.get('PORT');

  await app.listen(PORT);
}
bootstrap();
