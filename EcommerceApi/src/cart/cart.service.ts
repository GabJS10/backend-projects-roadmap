import { Inject, Injectable, HttpException } from '@nestjs/common';
import { PrismaCartRepository } from './prisma.cart.repository';
import { CART_REPOSITORY } from './cart.repository';
import { CartItem } from '@prisma/client';
import { CartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: PrismaCartRepository,
  ) {}

  async findCartItems(user_id: string): Promise<CartItem[]> {
    return await this.cartRepository.findCartItems(user_id);
  }

  async addToCart(cartDto: CartDto, user_id: string): Promise<CartItem> {
    return await this.cartRepository.addToCart(cartDto, user_id);
  }

  async removeFromCart(
    cartDto: CartDto,
    user_id: string,
  ): Promise<CartItem | null> {
    const cartItem = await this.cartRepository.removeFromCart(cartDto, user_id);

    if (!cartItem) {
      throw new HttpException('Item not found in cart', 404);
    }

    return cartItem;
  }
}
