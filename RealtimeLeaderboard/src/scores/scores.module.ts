import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { SCORES_REPOSITORY } from './scores-repository';
import { PrismaScoresRepository } from './prisma-scores-repository';
import { PrismaService } from 'src/prisma.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [ScoresController],
  providers: [
    ScoresService,
    PrismaService,
    {
      provide: SCORES_REPOSITORY,
      useClass: PrismaScoresRepository,
    },
  ],
})
export class ScoresModule {}
