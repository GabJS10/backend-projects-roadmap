import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from './products-repository';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class PrismaProductsRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: new Prisma.Decimal(product.price),
          stock: product.stock,
          imageFront: product.imageFront,
          imageBack: product.imageBack,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async search(query: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: {
          name: product.name ? product.name : undefined,
          description: product.description ? product.description : undefined,
          price: product.price ? new Prisma.Decimal(product.price) : undefined,
          stock: product.stock ? product.stock : undefined,
          imageFront: product.imageFront ? product.imageFront : undefined,
          imageBack: product.imageBack ? product.imageBack : undefined,
        },
      });
    } catch (error) {
      throw new NotFoundException('Producto no encontrado');
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Producto no encontrado');
    }
  }
}
