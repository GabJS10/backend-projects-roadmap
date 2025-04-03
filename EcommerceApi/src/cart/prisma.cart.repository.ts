import { HttpException, Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartDto } from './dto/create-cart.dto';
import { PrismaService } from 'src/prisma.service';
import { Cart, CartItem } from '@prisma/client';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prisma: PrismaService) {}

  async findCart(user_id: string): Promise<Cart> {
    let cart = await this.prisma.cart.findFirst({ where: { userId: user_id } });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId: user_id },
      });
    }

    return cart;
  }

  async findCartItems(user_id: string): Promise<CartItem[]> {
    try {
      const cart = await this.findCart(user_id);

      const items = await this.prisma.cartItem.findMany({
        where: {
          cartId: cart.id,
        },
        include: {
          product: true,
        },
      });

      const cartWithTotalPrice = items.map((item) => ({
        ...item,
        totalPrice: Number(item.product.price) * item.quantity,
      }));

      return cartWithTotalPrice;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
  async addToCart(CartDto: CartDto, user_id: string): Promise<CartItem> {
    try {
      const cart = await this.findCart(user_id);

      const product = await this.prisma.product.findUnique({
        where: { id: CartDto.productId },
      });

      if (!product) throw new HttpException('Product not found', 404);
      if (product.stock < CartDto.quantity)
        throw new HttpException('Not enough stock', 400);

      return await this.prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: CartDto.productId,
          },
        },
        update: {
          quantity: { increment: CartDto.quantity },
        },
        create: {
          cartId: cart.id,
          productId: CartDto.productId,
          quantity: CartDto.quantity,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Internal server error', 500);
    }
  }

  async removeFromCart(
    CartDto: CartDto,
    user_id: string,
  ): Promise<CartItem | null> {
    const cart = await this.findCart(user_id);

    const itemExists = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: CartDto.productId,
      },
    });

    if (!itemExists) {
      throw new HttpException('Item not found', 404);
    }

    try {
      if (itemExists.quantity > 1 && CartDto.quantity < itemExists.quantity) {
        return await this.prisma.cartItem.update({
          where: { id: itemExists.id },
          data: { quantity: itemExists.quantity - CartDto.quantity },
        });
      } else {
        await this.prisma.cartItem.delete({ where: { id: itemExists.id } });
        return null;
      }
    } catch (error) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
