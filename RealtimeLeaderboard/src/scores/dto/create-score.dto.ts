import { IsNumber } from 'class-validator';

export class CreateScoreDto {
  @IsNumber()
  score: number;

  @IsNumber()
  userId: string;

  @IsNumber()
  gameId: string;
}
