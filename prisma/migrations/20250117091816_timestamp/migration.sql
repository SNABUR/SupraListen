/*
  Warnings:

  - Added the required column `timestamp` to the `Lootbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lootbox" ADD COLUMN     "timestamp" BIGINT NOT NULL;
