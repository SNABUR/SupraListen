-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('INITIATED', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "block_progress" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "lastBlockHeight" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "block_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "collectionName" TEXT NOT NULL,
    "metadataUri" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "tokenName" TEXT NOT NULL,
    "tokenUri" TEXT NOT NULL,
    "rarityId" TEXT NOT NULL,
    "maxSupply" BIGINT NOT NULL,
    "currentSupply" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_ownerships" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_ownerships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lootboxes" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "priceCoinType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lootboxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lootbox_purchases" (
    "id" TEXT NOT NULL,
    "lootboxId" TEXT NOT NULL,
    "buyerAddress" TEXT NOT NULL,
    "quantity" BIGINT NOT NULL,
    "nonce" BIGINT NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'INITIATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lootbox_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lootbox_rewards" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "selectedToken" TEXT NOT NULL,
    "selectedRarity" TEXT NOT NULL,
    "randomNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lootbox_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rarities" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "rarityName" TEXT NOT NULL,
    "weight" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rarities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vrf_callbacks" (
    "id" TEXT NOT NULL,
    "nonce" BIGINT NOT NULL,
    "callerAddress" TEXT NOT NULL,
    "randomNumbers" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vrf_callbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_tracking" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "blockHeight" BIGINT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collections_creatorAddress_collectionName_key" ON "collections"("creatorAddress", "collectionName");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_collectionId_tokenName_key" ON "tokens"("collectionId", "tokenName");

-- CreateIndex
CREATE UNIQUE INDEX "token_ownerships_tokenId_ownerAddress_key" ON "token_ownerships"("tokenId", "ownerAddress");

-- CreateIndex
CREATE UNIQUE INDEX "rarities_collectionId_rarityName_key" ON "rarities"("collectionId", "rarityName");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "rarities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_ownerships" ADD CONSTRAINT "token_ownerships_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lootboxes" ADD CONSTRAINT "lootboxes_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lootbox_purchases" ADD CONSTRAINT "lootbox_purchases_lootboxId_fkey" FOREIGN KEY ("lootboxId") REFERENCES "lootboxes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lootbox_rewards" ADD CONSTRAINT "lootbox_rewards_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "lootbox_purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rarities" ADD CONSTRAINT "rarities_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
