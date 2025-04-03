import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CART_REPOSITORY } from './cart.repository';
import { PrismaCartRepository } from './prisma.cart.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    { provide: CART_REPOSITORY, useClass: PrismaCartRepository },
  ],
})
export class CartModule {}
