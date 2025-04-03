import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository, PRODUCT_REPOSITORY } from './products-repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.create(createProductDto);
    } catch (error) {
      throw new HttpException('Error al crear el producto', 500);
    }
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async search(query: string) {
    return await this.productRepository.search(query);
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product)
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      throw new NotFoundException(
        `No se pudo actualizar el producto con id ${id}`,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.productRepository.remove(id);
    } catch (error) {
      throw new NotFoundException(
        `No se pudo eliminar el producto con id ${id}`,
      );
    }
  }
}
