/*
  Warnings:

  - You are about to drop the `block_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_tracking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lootbox_purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lootbox_rewards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lootboxes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rarities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token_ownerships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vrf_callbacks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lootbox_purchases" DROP CONSTRAINT "lootbox_purchases_lootboxId_fkey";

-- DropForeignKey
ALTER TABLE "lootbox_rewards" DROP CONSTRAINT "lootbox_rewards_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "lootboxes" DROP CONSTRAINT "lootboxes_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "rarities" DROP CONSTRAINT "rarities_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "token_ownerships" DROP CONSTRAINT "token_ownerships_tokenId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_rarityId_fkey";

-- DropTable
DROP TABLE "block_progress";

-- DropTable
DROP TABLE "collections";

-- DropTable
DROP TABLE "event_tracking";

-- DropTable
DROP TABLE "lootbox_purchases";

-- DropTable
DROP TABLE "lootbox_rewards";

-- DropTable
DROP TABLE "lootboxes";

-- DropTable
DROP TABLE "rarities";

-- DropTable
DROP TABLE "token_ownerships";

-- DropTable
DROP TABLE "tokens";

-- DropTable
DROP TABLE "vrf_callbacks";

-- DropEnum
DROP TYPE "PurchaseStatus";

-- CreateTable
CREATE TABLE "BlockProgress" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "lastBlockHeight" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlockProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTracking" (
    "id" SERIAL NOT NULL,
    "eventType" TEXT NOT NULL,
    "blockHeight" BIGINT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "collectionName" TEXT NOT NULL,
    "metadataUri" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "rarityName" TEXT NOT NULL,
    "weight" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "rarityId" INTEGER NOT NULL,
    "tokenName" TEXT NOT NULL,
    "tokenUri" TEXT NOT NULL,
    "maxSupply" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lootbox" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "priceCoinType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lootbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LootboxPurchase" (
    "id" SERIAL NOT NULL,
    "lootboxId" INTEGER NOT NULL,
    "buyerAddress" TEXT NOT NULL,
    "quantity" BIGINT NOT NULL,
    "nonce" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LootboxPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LootboxReward" (
    "id" SERIAL NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "selectedToken" TEXT NOT NULL,
    "selectedRarity" TEXT NOT NULL,
    "randomNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LootboxReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VRFCallback" (
    "id" SERIAL NOT NULL,
    "callerAddress" TEXT NOT NULL,
    "nonce" BIGINT NOT NULL,
    "randomNumbers" BIGINT[],
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VRFCallback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenClaim" (
    "id" SERIAL NOT NULL,
    "claimer" TEXT NOT NULL,
    "claimResourceAddress" TEXT NOT NULL,
    "tokensClaimed" TEXT[],
    "totalTokens" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenTransfer" (
    "id" SERIAL NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenBurn" (
    "id" SERIAL NOT NULL,
    "burnerAddress" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenBurn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenMint" (
    "id" SERIAL NOT NULL,
    "minterAddress" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenMint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventTracking_eventType_idx" ON "EventTracking"("eventType");

-- CreateIndex
CREATE INDEX "EventTracking_blockHeight_idx" ON "EventTracking"("blockHeight");

-- CreateIndex
CREATE INDEX "EventTracking_processed_idx" ON "EventTracking"("processed");

-- CreateIndex
CREATE INDEX "Collection_creatorAddress_idx" ON "Collection"("creatorAddress");

-- CreateIndex
CREATE INDEX "Collection_collectionName_idx" ON "Collection"("collectionName");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_creatorAddress_collectionName_key" ON "Collection"("creatorAddress", "collectionName");

-- CreateIndex
CREATE INDEX "Rarity_collectionId_idx" ON "Rarity"("collectionId");

-- CreateIndex
CREATE INDEX "Rarity_rarityName_idx" ON "Rarity"("rarityName");

-- CreateIndex
CREATE INDEX "Token_collectionId_idx" ON "Token"("collectionId");

-- CreateIndex
CREATE INDEX "Token_rarityId_idx" ON "Token"("rarityId");

-- CreateIndex
CREATE INDEX "Token_tokenName_idx" ON "Token"("tokenName");

-- CreateIndex
CREATE INDEX "Lootbox_collectionId_idx" ON "Lootbox"("collectionId");

-- CreateIndex
CREATE INDEX "Lootbox_priceCoinType_idx" ON "Lootbox"("priceCoinType");

-- CreateIndex
CREATE INDEX "LootboxPurchase_lootboxId_idx" ON "LootboxPurchase"("lootboxId");

-- CreateIndex
CREATE INDEX "LootboxPurchase_buyerAddress_idx" ON "LootboxPurchase"("buyerAddress");

-- CreateIndex
CREATE INDEX "LootboxPurchase_nonce_idx" ON "LootboxPurchase"("nonce");

-- CreateIndex
CREATE INDEX "LootboxReward_purchaseId_idx" ON "LootboxReward"("purchaseId");

-- CreateIndex
CREATE INDEX "LootboxReward_selectedToken_idx" ON "LootboxReward"("selectedToken");

-- CreateIndex
CREATE INDEX "LootboxReward_selectedRarity_idx" ON "LootboxReward"("selectedRarity");

-- CreateIndex
CREATE INDEX "VRFCallback_callerAddress_idx" ON "VRFCallback"("callerAddress");

-- CreateIndex
CREATE INDEX "VRFCallback_nonce_idx" ON "VRFCallback"("nonce");

-- CreateIndex
CREATE INDEX "VRFCallback_timestamp_idx" ON "VRFCallback"("timestamp");

-- CreateIndex
CREATE INDEX "TokenClaim_claimer_idx" ON "TokenClaim"("claimer");

-- CreateIndex
CREATE INDEX "TokenClaim_claimResourceAddress_idx" ON "TokenClaim"("claimResourceAddress");

-- CreateIndex
CREATE INDEX "TokenClaim_timestamp_idx" ON "TokenClaim"("timestamp");

-- CreateIndex
CREATE INDEX "TokenTransfer_fromAddress_idx" ON "TokenTransfer"("fromAddress");

-- CreateIndex
CREATE INDEX "TokenTransfer_toAddress_idx" ON "TokenTransfer"("toAddress");

-- CreateIndex
CREATE INDEX "TokenTransfer_tokenId_idx" ON "TokenTransfer"("tokenId");

-- CreateIndex
CREATE INDEX "TokenTransfer_timestamp_idx" ON "TokenTransfer"("timestamp");

-- CreateIndex
CREATE INDEX "TokenBurn_burnerAddress_idx" ON "TokenBurn"("burnerAddress");

-- CreateIndex
CREATE INDEX "TokenBurn_tokenId_idx" ON "TokenBurn"("tokenId");

-- CreateIndex
CREATE INDEX "TokenBurn_timestamp_idx" ON "TokenBurn"("timestamp");

-- CreateIndex
CREATE INDEX "TokenMint_minterAddress_idx" ON "TokenMint"("minterAddress");

-- CreateIndex
CREATE INDEX "TokenMint_tokenId_idx" ON "TokenMint"("tokenId");

-- CreateIndex
CREATE INDEX "TokenMint_timestamp_idx" ON "TokenMint"("timestamp");

-- AddForeignKey
ALTER TABLE "Rarity" ADD CONSTRAINT "Rarity_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lootbox" ADD CONSTRAINT "Lootbox_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LootboxPurchase" ADD CONSTRAINT "LootboxPurchase_lootboxId_fkey" FOREIGN KEY ("lootboxId") REFERENCES "Lootbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LootboxReward" ADD CONSTRAINT "LootboxReward_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "LootboxPurchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
