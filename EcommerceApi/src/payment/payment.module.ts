import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { ORDER_REPOSITORY } from 'src/orders/order.repository';
import { PrismaOrderRepository } from 'src/orders/prisma.order.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PrismaService,
    { provide: ORDER_REPOSITORY, useClass: PrismaOrderRepository },
  ],
})
export class PaymentModule {}
