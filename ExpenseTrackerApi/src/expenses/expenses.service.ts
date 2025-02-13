import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesRepository, EXPENSE_REPOSITORY } from './expenses-repository';
import * as exceptions from 'src/exceptions';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject(EXPENSE_REPOSITORY)
    private readonly expensesRepository: ExpensesRepository,
  ) {}

  create(createExpenseDto: CreateExpenseDto) {
    try {
      return this.expensesRepository.create({
        ...createExpenseDto,
        amount: new Prisma.Decimal(createExpenseDto.amount),
      });
    } catch (error) {
      if (
        error instanceof exceptions.ForeingKeyException ||
        error instanceof exceptions.ValidationException
      ) {
        throw error;
      }

      if (error instanceof exceptions.DatabaseException) {
        throw new HttpException(
          'Database error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(
    user_id: number,
    filter?: string,
    startDate?: string,
    endDate?: string,
  ) {
    console.log(filter, startDate, endDate);

    let start_date: Date | undefined;
    let end_date: Date | undefined;

    switch (filter) {
      case 'past_week':
        start_date = dayjs().subtract(7, 'days').startOf('day').toDate();
        end_date = dayjs().endOf('day').toDate();
        break;
      case 'past_month':
        start_date = dayjs().subtract(1, 'month').startOf('day').toDate();
        end_date = dayjs().endOf('day').toDate();
        break;
      case 'last_3_months':
        start_date = dayjs().subtract(3, 'month').startOf('day').toDate();
        end_date = dayjs().endOf('day').toDate();
        break;
      case 'custom':
        if (!startDate || !endDate) {
          throw new HttpException(
            'Start date and end date are required for custom filter',
            HttpStatus.BAD_REQUEST,
          );
        }
        start_date = new Date(startDate);
        end_date = new Date(endDate);
        break;
      default:
        // Sin filtro: devolver todos los gastos del usuario
        return this.expensesRepository.findAll(user_id);
    }

    return this.expensesRepository.findAll(user_id, start_date, end_date);
  }

  async update(
    expense_id: number,
    user_id: number,
    updateExpenseDto: UpdateExpenseDto,
  ) {
    try {
      return this.expensesRepository.update(expense_id, user_id, {
        ...updateExpenseDto,
        amount: updateExpenseDto.amount
          ? new Prisma.Decimal(updateExpenseDto.amount)
          : undefined,
      });
    } catch (error) {
      if (
        error instanceof exceptions.EntityNotFoundException ||
        error instanceof exceptions.PermissionDeniedException ||
        error instanceof exceptions.ForeingKeyException ||
        error instanceof exceptions.ValidationException
      ) {
        console.log('!begra');

        throw error;
      }

      if (error instanceof exceptions.DatabaseException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new HttpException('Unexpected error', 500);
    }
  }

  remove(expense_id: number, user_id: number) {
    try {
      return this.expensesRepository.remove(expense_id, user_id);
    } catch (error) {
      if (
        error instanceof exceptions.EntityNotFoundException ||
        error instanceof exceptions.PermissionDeniedException
      ) {
        throw error;
      }

      if (
        error instanceof exceptions.DatabaseException ||
        error instanceof exceptions.ForeingKeyException
      ) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new HttpException('Unexpected error', 500);
    }
  }
}
