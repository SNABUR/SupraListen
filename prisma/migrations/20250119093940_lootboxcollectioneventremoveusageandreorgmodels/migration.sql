/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Lootbox` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Rarity` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tokenCollectionId,tokenName,propertyVersion]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collectionName` to the `Lootbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorAddress` to the `Lootbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadataUri` to the `Lootbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenCollectionId` to the `Lootbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lootboxId` to the `Rarity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenCollectionId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lootbox" DROP CONSTRAINT "Lootbox_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Rarity" DROP CONSTRAINT "Rarity_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_collectionId_fkey";

-- DropIndex
DROP INDEX "Lootbox_collectionId_idx";

-- DropIndex
DROP INDEX "Rarity_collectionId_idx";

-- DropIndex
DROP INDEX "Token_collectionId_idx";

-- DropIndex
DROP INDEX "Token_collectionId_tokenName_propertyVersion_key";

-- AlterTable
ALTER TABLE "Lootbox" DROP COLUMN "collectionId",
ADD COLUMN     "collectionName" TEXT NOT NULL,
ADD COLUMN     "creatorAddress" TEXT NOT NULL,
ADD COLUMN     "metadataUri" TEXT NOT NULL,
ADD COLUMN     "tokenCollectionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rarity" DROP COLUMN "collectionId",
ADD COLUMN     "lootboxId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "collectionId",
ADD COLUMN     "tokenCollectionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Collection";

-- CreateIndex
CREATE INDEX "Lootbox_tokenCollectionId_idx" ON "Lootbox"("tokenCollectionId");

-- CreateIndex
CREATE INDEX "Lootbox_creatorAddress_idx" ON "Lootbox"("creatorAddress");

-- CreateIndex
CREATE INDEX "Lootbox_collectionName_idx" ON "Lootbox"("collectionName");

-- CreateIndex
CREATE INDEX "Rarity_lootboxId_idx" ON "Rarity"("lootboxId");

-- CreateIndex
CREATE INDEX "Token_tokenCollectionId_idx" ON "Token"("tokenCollectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_tokenCollectionId_tokenName_propertyVersion_key" ON "Token"("tokenCollectionId", "tokenName", "propertyVersion");

-- AddForeignKey
ALTER TABLE "Rarity" ADD CONSTRAINT "Rarity_lootboxId_fkey" FOREIGN KEY ("lootboxId") REFERENCES "Lootbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_tokenCollectionId_fkey" FOREIGN KEY ("tokenCollectionId") REFERENCES "TokenCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lootbox" ADD CONSTRAINT "Lootbox_tokenCollectionId_fkey" FOREIGN KEY ("tokenCollectionId") REFERENCES "TokenCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
