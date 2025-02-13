import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpException,
  Req,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body()
    createExpenseDto: Pick<
      CreateExpenseDto,
      'description' | 'amount' | 'categoryId' | 'expenseDate'
    >,
    @Req() req: Request,
  ) {
    if (
      !createExpenseDto.categoryId ||
      !createExpenseDto.description ||
      !createExpenseDto.amount ||
      !createExpenseDto.expenseDate
    )
      throw new HttpException('Missing fields', 400);
    try {
      return this.expensesService.create({
        ...createExpenseDto,
        userId: +req.user['id'],
      });
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Req() req: Request,
    @Query('filter') filter?: string,
    @Query('start_date') startDate?: string,
    @Query('end_date') endDate?: string,
  ) {
    return this.expensesService.findAll(
      +req.user['id'],
      filter,
      startDate,
      endDate,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateExpenseDto: Partial<UpdateExpenseDto>,
  ) {
    try {
      return this.expensesService.update(
        +id,
        +req.user['id'],
        updateExpenseDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: Request) {
    try {
      return this.expensesService.remove(+id, +req.user['id']);
    } catch (error) {
      throw error;
    }
  }
}
