/*
  Warnings:

  - Added the required column `tokenAddress` to the `PoolsDB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PoolsDB" ADD COLUMN     "tokenAddress" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "PoolsDB_tokenAddress_idx" ON "PoolsDB"("tokenAddress");
