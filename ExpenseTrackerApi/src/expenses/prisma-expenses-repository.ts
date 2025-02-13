import { Expense } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { ExpensesRepository } from './expenses-repository';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import * as exceptions from 'src/exceptions';

@Injectable()
export class PrismaExpensesRepository implements ExpensesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createExpenseDto: Pick<
      Expense,
      'description' | 'amount' | 'userId' | 'categoryId' | 'expenseDate'
    >,
  ): Promise<Expense> {
    try {
      return await this.prisma.expense.create({ data: createExpenseDto });
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        throw new exceptions.ValidationException(
          'Input data validation failed',
        );
      }

      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new exceptions.ValidationException('Expense already exists');
        }

        if (e.code === 'P2003') {
          const error = e.message.match(
            /Foreign key constraint failed on the field: (\w+)/,
          );

          const field = error?.[1];

          if (field === 'userId') {
            throw new exceptions.ForeingKeyException(
              'User',
              createExpenseDto.userId,
            );
          }

          if (field === 'categoryId') {
            throw new exceptions.ForeingKeyException(
              'Category',
              createExpenseDto.categoryId,
            );
          }

          if (!field) {
            throw new exceptions.EntityNotFoundException('ID does not exist');
          }
        }

        throw new exceptions.DatabaseException(e.message);
      }
    }
  }

  async findAll(
    userId: number,
    start_date?: Date,
    end_date?: Date,
  ): Promise<Expense[]> {
    try {
      return await this.prisma.expense.findMany({
        where: {
          userId,
          expenseDate: {
            gte: start_date,
            lte: end_date,
          },
        },
        orderBy: {
          expenseDate: 'desc',
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new exceptions.ValidationException(
          'Input data validation failed',
        );
      }

      if (error instanceof PrismaClientKnownRequestError) {
        throw new exceptions.DatabaseException('Database error');
      }
    }
  }

  async update(
    expense_id: number,
    user_id: number,
    updateExpenseDto: Partial<Expense>,
  ): Promise<Expense> {
    console.log(updateExpenseDto);

    const expense = await this.prisma.expense.findUnique({
      where: {
        id: expense_id,
      },
    });

    if (!expense) throw new exceptions.EntityNotFoundException('Expense');

    if (expense.userId !== user_id)
      throw new exceptions.PermissionDeniedException();

    if (updateExpenseDto.categoryId) {
      const categoryExist = await this.prisma.category.findUnique({
        where: {
          id: updateExpenseDto.categoryId,
        },
      });

      if (!categoryExist)
        throw new exceptions.ForeingKeyException(
          'Category',
          updateExpenseDto.categoryId,
        );
    }

    try {
      return await this.prisma.expense.update({
        where: {
          id: expense_id,
        },
        data: updateExpenseDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new exceptions.ValidationException(
          'Input data validation failed',
        );
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new exceptions.ValidationException('Expense already exists');
        }

        if (error.code === 'P2006') {
          throw new exceptions.ValidationException(
            'Input data validation failed',
          );
        }

        if (error.code === 'P2003') {
          throw new exceptions.ForeingKeyException(
            'Category',
            updateExpenseDto.categoryId,
          );
        }
      }
    }
  }

  async remove(expense_id: number, user_id: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({
      where: {
        id: expense_id,
      },
    });

    if (!expense) {
      throw new exceptions.EntityNotFoundException('Expense');
    }

    if (expense.userId !== user_id)
      throw new exceptions.PermissionDeniedException();

    try {
      return await this.prisma.expense.delete({
        where: {
          id: expense_id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2014') {
          throw new exceptions.ForeingKeyException('Expense', expense_id);
        }
      }

      throw new exceptions.DatabaseException('Database error');
    }
  }
}
