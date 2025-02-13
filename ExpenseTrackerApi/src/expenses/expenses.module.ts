import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { EXPENSE_REPOSITORY } from './expenses-repository';
import { PrismaExpensesRepository } from './prisma-expenses-repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    PrismaService,
    {
      provide: EXPENSE_REPOSITORY,
      useClass: PrismaExpensesRepository,
    },
  ],
})
export class ExpensesModule {}
