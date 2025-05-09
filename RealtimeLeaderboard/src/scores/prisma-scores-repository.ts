import { PrismaService } from 'src/prisma.service';
import { Score } from '../generated/prisma';
import { ScoresRepository } from './scores-repository';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from 'src/redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class PrismaScoresRepository implements ScoresRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  async getMyPosition(userId: string, gameId: string): Promise<number> {
    const rank = await this.redis.zrevrank(
      `leaderboard:${gameId}`,
      `user:${userId}`,
    );
    return rank !== null ? rank + 1 : -1;
  }

  async reports(gameId: string, from: string, to: string): Promise<Score[]> {
    try {
      console.log(from, to);

      return await this.prisma.score.findMany({
        where: {
          game_id: gameId,
          submitted_at: {
            gte: new Date(from).toISOString(),
            lte: new Date(to).toISOString(),
          },
        },
      });
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getTop10(gameId: string): Promise<Score[]> {
    const key = `leaderboard:${gameId}`;

    const top = await this.redis.zrevrange(key, 0, 9, 'WITHSCORES');

    return top.reduce((acc, value, index) => {
      if (index % 2 === 1) {
        return acc;
      }

      acc.push({ user_id: value, score: Number(top[index + 1]) });
      return acc;
    }, []);
  }

  async setScore(
    userId: string,
    score: number,
    gameId: string,
  ): Promise<Score> {
    const key = `leaderboard:${gameId}`;
    const user = `user:${userId}`;

    await this.redis.zadd(key, score, user);

    return await this.prisma.score.upsert({
      where: { user_id_game_id: { user_id: userId, game_id: gameId } },
      update: { score },
      create: { user_id: userId, score, game_id: gameId },
    });
  }
}
