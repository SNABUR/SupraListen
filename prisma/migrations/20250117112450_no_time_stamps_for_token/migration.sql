/*
  Warnings:

  - You are about to drop the column `timestamp` on the `TokenCollection` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TokenCollection_timestamp_idx";

-- AlterTable
ALTER TABLE "TokenCollection" DROP COLUMN "timestamp";
