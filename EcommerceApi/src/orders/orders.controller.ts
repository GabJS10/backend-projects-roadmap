import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateOrderItemDto } from './dto/create.orderitem.dto';
import { CreateOrderDto } from './dto/create.order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Req() req,
    @Body() order: { order: CreateOrderDto; items: CreateOrderItemDto[] },
  ) {
    try {
      const { order: createdOrder, clientSecret } =
        await this.ordersService.create(req.user.id, order);

      return {
        message: 'Orden creada exitosamente',
        order: createdOrder,
        clientSecret,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Error al procesar la orden', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
