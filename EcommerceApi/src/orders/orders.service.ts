import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create.orderitem.dto';
import { CreateOrderDto } from './dto/create.order.dto';
import { ORDER_REPOSITORY, OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly ordersRepository: OrderRepository,
  ) {}

  async create(
    userId: string,
    order: { order: CreateOrderDto; items: CreateOrderItemDto[] },
  ) {
    return await this.ordersRepository.create(userId, order);
  }
}
