import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configLoader from './config-loader';
import { envSchema } from './env-schema';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [AuthModule,ConfigModule.forRoot({
    load: [configLoader],
    validationSchema: envSchema
  }), ProductsModule, CartModule, OrdersModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
