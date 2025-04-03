import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './roles.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const user = await this.authService.logout(req.user);

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    return { message: 'Logout successful' };
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken)
      throw new HttpException('Refresh token is required', 400);

    //verificar
    const is_valid = this.authService.verifyRefreshToken(refreshToken);

    if (!is_valid) throw new HttpException('Token invalid', 400);

    //buscar

    const user = await this.authService.findUserByRefreshToken(refreshToken);

    if (!user) throw new HttpException('User not found', 400);

    //generar

    const tokens = await this.authService.generateTokens({
      email: user.email,
      name: user.name,
      id: user.id,
      role: await this.authService.findUserRole(user.id),
    });

    //actualizar

    await this.authService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    const user = await this.authService.register(RegisterDto);

    if (!user) {
      throw new HttpException('User already exists', 400);
    }

    return {
      message: 'User created successfully',
      user: {
        email: user.email,
        name: user.name,
        id: user.id,
      },
    };
  }
}
