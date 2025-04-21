import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformImageDto } from './dto/transformations-dto';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';
import s3Storage, { AUTO_CONTENT_TYPE } from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: s3Storage({
        s3: new S3Client({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        }),
        bucket: process.env.AWS_BUCKET_NAME,
        key: (req, file, cb) => {
          const userId = req.user['id'];
          cb(null, `uploads/${userId}/${Date.now()}-${file.originalname}`);
        },
        contentType: AUTO_CONTENT_TYPE,
      }),
      fileFilter: (req, file, cb) => {
        //only images
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg'
        ) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  async uploadImage(
    @Req() req: Request,
    @UploadedFile() file: Express.MulterS3.File,
  ): Promise<Image> {
    return await this.imagesService.uploadImage(req.user['id'], file);
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async listImages(@Req() req: Request): Promise<Image[]> {
    return await this.imagesService.listImages(req.user['id']);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getImage(@Req() req: Request, @Param('id') id: string): Promise<Image> {
    return await this.imagesService.getImage(req.user['id'], id);
  }

  @Post('/transform/:id')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async transformImage(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: TransformImageDto,
  ): Promise<Image> {
    console.log(req.user);

    return await this.imagesService.transformImage(id, body, req.user['id']);
  }
}
