import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  Query,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { isValidDateFormat } from 'src/helpers/valiDate';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post('set-score')
  @UseGuards(JwtAuthGuard)
  setScore(
    @Body() createScoreDto: Pick<CreateScoreDto, 'score' | 'gameId'>,
    @Req() req: Request,
  ) {
    return this.scoresService.setScore({
      ...createScoreDto,
      userId: req.user['id'],
    });
  }

  @Get('get-top-10/:gameId')
  getTop10(@Param('gameId') gameId: string) {
    return this.scoresService.getTop10(gameId);
  }

  @Get('get-my-position/:userId/:gameId')
  getMyPosition(
    @Param('userId') userId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.scoresService.getMyPosition(userId, gameId);
  }

  @Get('reports/:gameId')
  reports(
    @Param('gameId') gameId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    if (!(isValidDateFormat(from) && isValidDateFormat(to))) {
      throw new HttpException('Invalid date format', 400);
    }

    return this.scoresService.reports(gameId, from, to);
  }
}
