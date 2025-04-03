import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PRODUCT_REPOSITORY } from './products-repository';
import { PrismaProductsRepository } from './prisma.products.repository';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    { provide: PRODUCT_REPOSITORY, useClass: PrismaProductsRepository },
  ],
})
export class ProductsModule {}
