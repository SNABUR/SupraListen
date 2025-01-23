/*
  Warnings:

  - You are about to drop the column `timestamp` on the `TokenMint` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TokenMint_timestamp_idx";

-- AlterTable
ALTER TABLE "TokenMint" DROP COLUMN "timestamp";
