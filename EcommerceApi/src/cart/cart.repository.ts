import { Cart, CartItem } from '@prisma/client';
import { CartDto } from './dto/create-cart.dto';

export const CART_REPOSITORY = 'CartRepository';

export interface CartRepository {
  findCart(user_id: string): Promise<Cart>;
  findCartItems(user_id: string): Promise<CartItem[]>;
  addToCart(CartDto: CartDto, user_id: string): Promise<CartItem>;
  removeFromCart(CartDto: CartDto, user_id: string): Promise<CartItem>;
}
