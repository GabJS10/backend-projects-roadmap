import { HttpException, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order, Payment, PaymentStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create.order.dto';
import { CreateOrderItemDto } from './dto/create.orderitem.dto';
import { PrismaService } from 'src/prisma.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService,
  ) {}

  async update(
    payment_intent: string,
    data: Partial<Payment>,
  ): Promise<Payment | null> {
    try {
      return await this.prisma.payment.update({
        where: {
          paymentIntentId: payment_intent,
        },
        data,
      });
    } catch (error) {
      console.error(
        `❌ No se encontró el PaymentIntent en la DB: ${payment_intent}`,
      );
      return null;
    }
  }

  async create(
    user_id: string,
    order: { order: CreateOrderDto; items: CreateOrderItemDto[] },
  ): Promise<{ order: Order; clientSecret: string }> {
    //first calculate the total amount of the order
    let totalAmountOffTheOrder = 0;
    order.items.forEach((item) => {
      totalAmountOffTheOrder += item.quantity * item.price;
    });

    //crear la orden
    const createdOrder = await this.prisma.order.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        total: totalAmountOffTheOrder,
        email: order.order.email,
        country: order.order.country,
        name: order.order.name,
        lastName: order.order.lastName,
        dni: order.order.dni,
        direction: order.order.direction,
        direction_details: order.order.direction_details,
        city: order.order.city,
        state: order.order.state,
        phone: order.order.phone,
        zip: order.order.zip,

        items: {
          create: order.items.map((item) => ({
            product: {
              connect: {
                id: item.product_id,
              },
            },
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    //create the payment intent
    const paymentIntent = await this.paymentService.createPaymentIntent(
      totalAmountOffTheOrder,
    );

    await this.prisma.payment.create({
      data: {
        orderId: createdOrder.id,
        paymentIntentId: paymentIntent.id,
        amount: totalAmountOffTheOrder,
        status: paymentIntent.status,
      },
    });

    //return the order
    return {
      order: createdOrder,
      clientSecret: paymentIntent.client_secret,
    };
  }
}
