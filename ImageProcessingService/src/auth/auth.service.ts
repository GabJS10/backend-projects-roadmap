import { HttpException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { USER_REPOSITORY, UserRepository } from './users-repository';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

 

  async logout(user: Express.User) {
    const email = user['email'];

    return await this.userRepository.deleteUserRefreshToken(email);
  }

  verifyRefreshToken(token: string) {
    try {
      const user = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      if (!user) return false;

      return true;
    } catch (error) {
      return false;
    }
  }

  async findUserByRefreshToken(refreshToken: string) {
    const user = await this.userRepository.findUserByRefreshToken(refreshToken);

    if (!user) return null;

    return user;
  }

  async updateRefreshToken(user_id: string, refreshToken: string) {
    return await this.userRepository.updateRefreshToken(user_id, refreshToken);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    const { password: _, ...result } = user;

    const tokens = await this.generateTokens({
      email: user.email,
      name: user.name,
      id: user.id,
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async generateTokens({
    email,
    name,
    id,
  }: {
    email: string;
    name: string;
    id: string;
  }) {
    const accessToken = this.jwtService.sign({
      email,
      name,
      id,
    });
    const refreshToken = this.jwtService.sign(
      { email, name, id },
      {
        expiresIn: '7d',
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }

  async register({ email, name, password }: RegisterDto) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.createUser({
      email,
      name,
      password: encryptedPassword,
    });
  }
}
