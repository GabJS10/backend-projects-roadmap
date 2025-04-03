import { CreateOrderDto } from './dto/create.order.dto';
import { CreateOrderItemDto } from './dto/create.orderitem.dto';
import { Order, Payment } from '@prisma/client';

export const ORDER_REPOSITORY = 'OrderRepository';

export interface OrderRepository {
  create(
    user_id: string,
    order: { order: CreateOrderDto; items: CreateOrderItemDto[] },
  ): Promise<{
    order: Order;
    clientSecret: string;
  }>;
  update(order_id: string, data: Partial<Payment>): Promise<Payment>;
}
