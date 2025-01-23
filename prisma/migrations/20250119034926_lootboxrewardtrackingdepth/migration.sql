/*
  Warnings:

  - Added the required column `buyerAddress` to the `LootboxReward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionName` to the `LootboxReward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nonce` to the `LootboxReward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `LootboxReward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LootboxReward" ADD COLUMN     "buyerAddress" TEXT NOT NULL,
ADD COLUMN     "collectionName" TEXT NOT NULL,
ADD COLUMN     "nonce" TEXT NOT NULL,
ADD COLUMN     "timestamp" BIGINT NOT NULL;
