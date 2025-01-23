/*
  Warnings:

  - Added the required column `availableStock` to the `Lootbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxStock` to the `Lootbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasedTotal` to the `Lootbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lootbox" ADD COLUMN     "availableStock" BIGINT NOT NULL,
ADD COLUMN     "maxStock" BIGINT NOT NULL,
ADD COLUMN     "purchasedTotal" BIGINT NOT NULL;
