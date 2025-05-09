import { Score } from '../generated/prisma';

export const SCORES_REPOSITORY = 'ScoresRepository';

export interface ScoresRepository {
  setScore(userId: string, score: number, gameId: string): Promise<Score>;
  getTop10(gameId: string): Promise<Score[]>;
  getMyPosition(userId: string, gameId: string): Promise<number>;
  reports(gameId: string, from: string, to: string): Promise<Score[]>;
}
