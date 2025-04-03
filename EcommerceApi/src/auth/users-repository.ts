import { User } from '@prisma/client';

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository {
  findUserRole(id: string): Promise<string>;
  deleteUserRefreshToken(email: string): Promise<User | null>;
  findUserByRefreshToken(refreshToken: string): Promise<User | null>;
  updateRefreshToken(
    user_id: string,
    refreshToken: string,
  ): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createUser({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<User>;
}
