/*
  Warnings:

  - Added the required column `expenseDate` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "expenseDate" TIMESTAMP(3) NOT NULL;
