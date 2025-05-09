import { Inject, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { SCORES_REPOSITORY, ScoresRepository } from './scores-repository';
import { Score } from '../generated/prisma';

@Injectable()
export class ScoresService {
  constructor(
    @Inject(SCORES_REPOSITORY)
    private readonly scoresRepository: ScoresRepository,
  ) {}

  setScore(createScoreDto: CreateScoreDto): Promise<Score> {
    return this.scoresRepository.setScore(
      createScoreDto.userId,
      createScoreDto.score,
      createScoreDto.gameId,
    );
  }

  getTop10(gameId: string): Promise<Score[]> {
    return this.scoresRepository.getTop10(gameId);
  }

  getMyPosition(userId: string, gameId: string): Promise<number> {
    return this.scoresRepository.getMyPosition(userId, gameId);
  }

  reports(gameId: string, from: string, to: string): Promise<Score[]> {
    return this.scoresRepository.reports(gameId, from, to);
  }
}
