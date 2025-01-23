/*
  Warnings:

  - You are about to drop the column `timestamp` on the `TokenData` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TokenData_timestamp_idx";

-- AlterTable
ALTER TABLE "TokenData" DROP COLUMN "timestamp";
