import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd') {
    return await this.stripe.paymentIntents.create({
      amount: amount,
      currency,
      payment_method_types: ['card'],
    });
  }

  constructWebhookEvent(body: any, sig: string, secret: string) {
    return this.stripe.webhooks.constructEvent(body, sig, secret);
  }
}
