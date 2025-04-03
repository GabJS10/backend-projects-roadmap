import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { ORDER_REPOSITORY } from './order.repository';
import { PrismaOrderRepository } from './prisma.order.repository';
import { PaymentService } from 'src/payment/payment.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    PaymentService,
    ConfigService,
    {
      provide: ORDER_REPOSITORY,
      useClass: PrismaOrderRepository,
    },
  ],
})
export class OrdersModule {}
