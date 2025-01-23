/*
  Warnings:

  - Added the required column `collectionDescription` to the `Lootbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lootbox" ADD COLUMN     "collectionDescription" TEXT NOT NULL;
