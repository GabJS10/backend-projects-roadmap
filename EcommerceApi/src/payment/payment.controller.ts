import {
  Controller,
  HttpException,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { ORDER_REPOSITORY, OrderRepository } from 'src/orders/order.repository';
import { Payment, PaymentStatus } from '@prisma/client';
import { Request, Response } from 'express';
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    private readonly configService: ConfigService,
  ) {}

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers['stripe-signature'] as string;
    const endpointSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );

    let event: Stripe.Event;

    try {
      event = this.paymentService.constructWebhookEvent(
        req['rawBody'],
        signature,
        endpointSecret,
      );
    } catch (error) {
      console.error('⚠️  Error verificando webhook:', error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    let payment: Payment;

    // Manejar eventos de Stripe
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        try {
          const updatedPayment = await this.orderRepository.update(
            paymentIntent.id,
            {
              status: PaymentStatus.succeeded,
            },
          );

          if (!updatedPayment) {
            console.warn(
              `⚠️ Webhook recibido para PaymentIntent ${paymentIntent.id}, pero no existe en la base de datos.`,
            );
            return res
              .status(200)
              .send(
                'PaymentIntent no encontrado en la base de datos, pero webhook procesado.',
              );
          }

          console.log(
            `✅ Pago confirmado para PaymentIntent: ${paymentIntent.id}`,
          );
        } catch (error) {
          console.error(
            '❌ Error actualizando el pago en la DB:',
            error.message,
          );
          return res.status(500).send('Error actualizando pago');
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.warn(`⚠️ Pago fallido para PaymentIntent: ${paymentIntent.id}`);
        try {
          await this.orderRepository.update(paymentIntent.id, {
            status: PaymentStatus.processing,
          });
        } catch (error) {
          console.error(
            '❌ Error actualizando el estado del pago:',
            error.message,
          );
          return res.status(500).send('Error actualizando pago fallido');
        }
        break;
      }

      default:
        console.log(`ℹ️ Evento no manejado: ${event.type}`);
    }

    res.status(200).send('Webhook recibido');
  }
}
