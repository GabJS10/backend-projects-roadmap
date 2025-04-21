import { Image } from '@prisma/client';
import { TransformImageDto } from './dto/transformations-dto';

export const IMAGES_REPOSITORY = 'ImagesRepository';

export interface ImagesRepository {
  uploadImage(user_id: string, image: Express.MulterS3.File): Promise<Image>;
  getImage(user_id: string, idImage: string): Promise<Image>;
  listImages(user_id: string): Promise<Image[]>;
  transformImage(
    imageId: string,
    user_id: string,
    options: TransformImageDto,
  ): Promise<Image>;
}
