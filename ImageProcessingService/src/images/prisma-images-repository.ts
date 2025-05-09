import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ImagesRepository } from './images-repository';
import { Image } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { TransformImageDto } from './dto/transformations-dto';
import sharp from 'sharp';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class PrismaImagesRepository implements ImagesRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly s3: S3Service,
  ) {}

  async transformImage(
    imageId: string,
    user_id: string,
    options: TransformImageDto,
  ): Promise<Image> {
    console.log(imageId, user_id);

    const cache = await this.cacheManager.get(`${imageId}-${options}`);

    if (cache) {
      console.log('from cache', cache);
      return cache as Image;
    }

    const imageDb = await this.prisma.image.findFirst({
      where: {
        id: imageId,
        userId: user_id,
      },
    });

    if (!imageDb) {
      throw new NotFoundException('Image not found');
    }

    const img = await fetch(imageDb.url);

    const buffer = Buffer.from(await img.arrayBuffer());

    let transformedImage = sharp(buffer);

    if (options.resize) {
      transformedImage = transformedImage.resize({
        width: options.resize.width,
        height: options.resize.height,
      });
    }

    if (options.crop) {
      transformedImage = transformedImage.extract({
        width: options.crop.width,
        height: options.crop.height,
        left: options.crop.left,
        top: options.crop.top,
      });
    }

    if (options.rotate) {
      transformedImage = transformedImage.rotate(options.rotate);
    }

    if (options.flip) {
      transformedImage = transformedImage.flip();
    }

    if (options.format) {
      transformedImage = transformedImage.toFormat(options.format);
    }

    if (options.grayscale) {
      transformedImage = transformedImage.grayscale();
    }

    if (options.sepia) {
      transformedImage = transformedImage.grayscale().composite([
        {
          input: {
            create: {
              width: 1,
              height: 1,
              channels: 4,
              background: { r: 112, g: 66, b: 20, alpha: 0.4 },
            },
          },
          tile: true,
          blend: 'overlay',
        },
      ]);
    }

    if (options.compress) {
      transformedImage = transformedImage.jpeg({
        quality: options.compress.quality,
      });
    }

    if (options.watermark) {
      transformedImage = transformedImage.composite([
        {
          input: options.watermark.imagePath,
          gravity: options.watermark.gravity,
        },
      ]);
    }

    const transformedBuffer = await transformedImage.toBuffer();
    const date = Date.now();
    const filename = `transformed-${date}.jpg`;
    const key = `uploads/${user_id}/transformed/${filename}`;

    const url = await this.s3.uploadFile(
      transformedBuffer,
      key,
      options.format || imageDb.type,
    );

    const newImage = await this.prisma.image.create({
      data: {
        userId: user_id,
        url,
        size: transformedBuffer.byteLength,
        type: imageDb.type,
      },
    });

    await this.cacheManager.set(`${imageId}-${options}`, newImage, 1000 * 10);

    return newImage;
  }

  async uploadImage(
    user_id: string,
    image: Express.MulterS3.File,
  ): Promise<Image> {
    console.log(image);

    try {
      return await this.prisma.image.create({
        data: {
          userId: user_id,
          url: image.location,
          size: image.size,
          type: image.mimetype,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('El email ya estaba registrado.');
      }
      throw new InternalServerErrorException(
        `Error al guardar la imagen: ${error.message}`,
      );
    }
  }

  async getImage(user_id: string, idImage: string): Promise<Image> {
    const image = await this.prisma.image.findFirst({
      where: {
        id: idImage,
        userId: user_id,
      },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    return image;
  }

  async listImages(user_id: string): Promise<Image[]> {
    return await this.prisma.image.findMany({
      where: {
        userId: user_id,
      },
    });
  }
}
