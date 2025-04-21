import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/prisma.service';
import { IMAGES_REPOSITORY } from './images-repository';
import { PrismaImagesRepository } from './prisma-images-repository';
import { S3Service } from 'src/s3/s3.service';

@Module({
  controllers: [ImagesController],
  providers: [
    ImagesService,
    PrismaService,
    {
      provide: IMAGES_REPOSITORY,
      useClass: PrismaImagesRepository,
    },
    S3Service,
  ],
})
export class ImagesModule {}
