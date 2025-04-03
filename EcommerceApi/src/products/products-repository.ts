import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export const PRODUCT_REPOSITORY = 'ProductRepository';

export interface ProductRepository {
  create(product: CreateProductDto): Promise<Product>;

  findAll(): Promise<Product[]>;

  search(query: string): Promise<Product[]>;

  findOne(id: string): Promise<Product | null>;

  update(id: string, product: UpdateProductDto): Promise<Product>;

  remove(id: string): Promise<Product>;
}
