import { User } from '@prisma/client';
import { UserRepository } from './users-repository';
import { PrismaService } from 'src/prisma.service';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async deleteUserRefreshToken(email: string): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { email },
        data: { refreshToken: null },
      });
    } catch (error) {
      throw new BadRequestException(`Error al eliminar el refresh token: ${error.message}`);
    }
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { refreshToken },
    });
  }

  async updateRefreshToken(user_id: string, refreshToken: string): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: user_id },
        data: { refreshToken },
      });
    } catch (error) {
      throw new BadRequestException(`No se pudo actualizar el refresh token: ${error.message}`);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser({ email, name, password }: { email: string; name: string; password: string; }): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: { email, name, password },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('El email ya está registrado.');
      }
      throw new InternalServerErrorException(`Error al crear usuario: ${error.message}`);
    }
  }
}
