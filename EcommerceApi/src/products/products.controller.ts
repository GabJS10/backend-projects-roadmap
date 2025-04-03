import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { BASE_URL } from 'src/constants';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'front', maxCount: 1 },
        { name: 'back', maxCount: 1 },
      ],
      {
        storage: multer.diskStorage({
          destination: './uploads',
          filename: function (req, file, cb) {
            cb(null, file.originalname);
          },
        }),
        fileFilter: function (req, file, cb) {
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
          } else {
            cb(new Error('Invalid file type'), false);
          }
        },
      },
    ),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      front?: Express.Multer.File[];
      back?: Express.Multer.File[];
    },
  ) {
    return await this.productsService.create({
      ...createProductDto,
      imageFront: files.front
        ? `${BASE_URL}/uploads/${files.front[0].filename}`
        : null,
      imageBack: files.back
        ? `${BASE_URL}/uploads/${files.back[0].filename}`
        : null,
    });
  }

  @Get()
  async findAll(@Query('q') query: string) {
    if (query) return await this.productsService.search(query);
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Post(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'front', maxCount: 1 },
        { name: 'back', maxCount: 1 },
      ],
      {
        storage: multer.diskStorage({
          destination: './uploads',
          filename: function (req, file, cb) {
            cb(null, file.originalname);
          },
        }),
        fileFilter: function (req, file, cb) {
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
          } else {
            cb(new Error('Invalid file type'), false);
          }
        },
      },
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles()
    files: {
      front?: Express.Multer.File[];
      back?: Express.Multer.File[];
    },
  ) {
    return await this.productsService.update(id, {
      ...updateProductDto,
      imageFront: files.front
        ? `${BASE_URL}/uploads/${files.front[0].filename}`
        : null,
      imageBack: files.back
        ? `${BASE_URL}/uploads/${files.back[0].filename}`
        : null,
    });
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
