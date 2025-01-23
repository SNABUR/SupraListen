/*
  Warnings:

  - Added the required column `fromAddress` to the `TokenBurn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toAddress` to the `TokenDeposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromAddress` to the `TokenWithdraw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TokenBurn" ADD COLUMN     "fromAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TokenDeposit" ADD COLUMN     "toAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TokenWithdraw" ADD COLUMN     "fromAddress" TEXT NOT NULL;
