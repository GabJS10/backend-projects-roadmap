import { Inject, Injectable } from '@nestjs/common';
import { IMAGES_REPOSITORY, ImagesRepository } from './images-repository';
import { ImageDto } from './dto/images-dto';
import { Image } from '@prisma/client';
import { TransformImageDto } from './dto/transformations-dto';
@Injectable()
export class ImagesService {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imagesRepository: ImagesRepository,
  ) {}

  async uploadImage(
    user_id: string,
    image: Express.MulterS3.File,
  ): Promise<Image> {
    return this.imagesRepository.uploadImage(user_id, image);
  }

  async getImage(user_id: string, idImage: string): Promise<Image> {
    return this.imagesRepository.getImage(user_id, idImage);
  }

  async listImages(user_id: string): Promise<Image[]> {
    return this.imagesRepository.listImages(user_id);
  }

  async transformImage(
    imageId: string,
    options: TransformImageDto,
    user_id: string,
  ): Promise<Image> {
    return this.imagesRepository.transformImage(imageId, user_id, options);
  }
}
