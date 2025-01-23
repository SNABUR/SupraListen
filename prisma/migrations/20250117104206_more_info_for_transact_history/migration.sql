/*
  Warnings:

  - You are about to drop the column `timestamp` on the `TokenBurn` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `TokenDeposit` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `TokenWithdraw` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TokenBurn_timestamp_idx";

-- DropIndex
DROP INDEX "TokenDeposit_timestamp_idx";

-- DropIndex
DROP INDEX "TokenWithdraw_timestamp_idx";

-- AlterTable
ALTER TABLE "TokenBurn" DROP COLUMN "timestamp";

-- AlterTable
ALTER TABLE "TokenDeposit" DROP COLUMN "timestamp";

-- AlterTable
ALTER TABLE "TokenTransaction" ADD COLUMN     "fromAddress" TEXT,
ADD COLUMN     "toAddress" TEXT;

-- AlterTable
ALTER TABLE "TokenWithdraw" DROP COLUMN "timestamp";

-- CreateIndex
CREATE INDEX "TokenTransaction_fromAddress_idx" ON "TokenTransaction"("fromAddress");

-- CreateIndex
CREATE INDEX "TokenTransaction_toAddress_idx" ON "TokenTransaction"("toAddress");
