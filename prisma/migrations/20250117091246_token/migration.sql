/*
  Warnings:

  - You are about to drop the column `minterAddress` on the `TokenMint` table. All the data in the column will be lost.
  - You are about to drop the column `tokenId` on the `TokenMint` table. All the data in the column will be lost.
  - You are about to drop the `TokenBurn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenTransfer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tokenDataId` to the `TokenMint` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TokenMint_minterAddress_idx";

-- DropIndex
DROP INDEX "TokenMint_tokenId_idx";

-- AlterTable
ALTER TABLE "TokenMint" DROP COLUMN "minterAddress",
DROP COLUMN "tokenId",
ADD COLUMN     "tokenDataId" JSONB NOT NULL;

-- DropTable
DROP TABLE "TokenBurn";

-- DropTable
DROP TABLE "TokenTransfer";

-- CreateTable
CREATE TABLE "TokenData" (
    "id" SERIAL NOT NULL,
    "creator" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maximum" BIGINT NOT NULL,
    "uri" TEXT NOT NULL,
    "royaltyPayeeAddress" TEXT NOT NULL,
    "royaltyPointsDenominator" BIGINT NOT NULL,
    "royaltyPointsNumerator" BIGINT NOT NULL,
    "propertyKeys" TEXT[],
    "propertyValues" JSONB NOT NULL,
    "propertyTypes" TEXT[],
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenCollection" (
    "id" SERIAL NOT NULL,
    "creator" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "maximum" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenDeposit" (
    "id" SERIAL NOT NULL,
    "tokenId" JSONB NOT NULL,
    "amount" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenWithdraw" (
    "id" SERIAL NOT NULL,
    "tokenId" JSONB NOT NULL,
    "amount" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenWithdraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TokenData_creator_idx" ON "TokenData"("creator");

-- CreateIndex
CREATE INDEX "TokenData_collection_idx" ON "TokenData"("collection");

-- CreateIndex
CREATE INDEX "TokenData_name_idx" ON "TokenData"("name");

-- CreateIndex
CREATE INDEX "TokenData_timestamp_idx" ON "TokenData"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "TokenData_creator_collection_name_key" ON "TokenData"("creator", "collection", "name");

-- CreateIndex
CREATE INDEX "TokenCollection_creator_idx" ON "TokenCollection"("creator");

-- CreateIndex
CREATE INDEX "TokenCollection_name_idx" ON "TokenCollection"("name");

-- CreateIndex
CREATE INDEX "TokenCollection_timestamp_idx" ON "TokenCollection"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "TokenCollection_creator_name_key" ON "TokenCollection"("creator", "name");

-- CreateIndex
CREATE INDEX "TokenDeposit_timestamp_idx" ON "TokenDeposit"("timestamp");

-- CreateIndex
CREATE INDEX "TokenWithdraw_timestamp_idx" ON "TokenWithdraw"("timestamp");
