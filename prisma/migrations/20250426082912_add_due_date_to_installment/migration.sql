/*
  Warnings:

  - You are about to drop the column `dueDay` on the `Loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Installment" ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "dueDay";
