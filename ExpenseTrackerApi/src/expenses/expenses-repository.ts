import { Expense } from '@prisma/client';

export const EXPENSE_REPOSITORY = 'ExpenseRepository';

export interface ExpensesRepository {
  create(
    createExpenseDto: Pick<
      Expense,
      'description' | 'amount' | 'userId' | 'categoryId' | 'expenseDate'
    >,
  ): Promise<Expense>;

  findAll(
    userId: number,
    start_date?: Date,
    end_date?: Date,
  ): Promise<Expense[]>;

  update(
    expense_id: number,
    user_id: number,
    updateExpenseDto: Partial<Expense>,
  ): Promise<Expense>;

  remove(expense_id: number, user_id: number): Promise<Expense>;
}
