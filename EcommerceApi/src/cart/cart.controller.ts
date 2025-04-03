import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/create-cart.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findCartItems(@Req() req) {
    const userId = req.user.id;
    return await this.cartService.findCartItems(userId);
  }

  @Post('addToCart')
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addToCart(@Body() cartDto: CartDto, @Req() req) {
    const userId = req.user.id;
    return await this.cartService.addToCart(cartDto, userId);
  }

  @Delete('removeFromCart')
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async removeFromCart(@Body() cartDto: CartDto, @Req() req) {
    const userId = req.user.id;
    return await this.cartService.removeFromCart(cartDto, userId);
  }
}
