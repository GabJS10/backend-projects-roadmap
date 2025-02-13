import { User } from '@prisma/client';
import { UserRepository } from './users-repository';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async deleteUserRefreshToken(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          refreshToken: null,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          refreshToken: refreshToken,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async updateRefreshToken(
    user_id: number,
    refreshToken: string,
  ): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      console.log(error);

      return null;
    }
  }
  async createUser({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
