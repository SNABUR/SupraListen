/*
  Warnings:

  - You are about to drop the column `timestamp` on the `TokenTransaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TokenTransaction_timestamp_idx";

-- AlterTable
ALTER TABLE "TokenTransaction" DROP COLUMN "timestamp";
