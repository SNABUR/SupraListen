/*
  Warnings:

  - You are about to drop the column `token0` on the `Ammpair` table. All the data in the column will be lost.
  - You are about to drop the column `token1` on the `Ammpair` table. All the data in the column will be lost.
  - Added the required column `token0Id` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token1Id` to the `Ammpair` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ammpair" DROP COLUMN "token0",
DROP COLUMN "token1",
ADD COLUMN     "token0Id" TEXT NOT NULL,
ADD COLUMN     "token1Id" TEXT NOT NULL;

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
CREATE TABLE "VRFCallback" (
    "id" SERIAL NOT NULL,
    "callerAddress" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "randomNumbers" TEXT[],
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VRFCallback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeEvent" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "creationNumber" TEXT NOT NULL,
    "accountAddress" TEXT NOT NULL,
    "sequenceNumber" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "isBuy" BOOLEAN NOT NULL,
    "supraAmount" BIGINT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "tokenAmount" BIGINT NOT NULL,
    "user" TEXT NOT NULL,
    "virtualSupraReserves" BIGINT NOT NULL,
    "virtualTokenReserves" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoolsDB" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "dev" TEXT NOT NULL,
    "initialVirtualSupraReserves" BIGINT NOT NULL,
    "initialVirtualTokenReserves" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "platformFee" INTEGER NOT NULL,
    "pool" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "tokenDecimals" INTEGER NOT NULL,
    "twitter" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PoolsDB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "iconUri" TEXT NOT NULL,
    "projectUri" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "walletAddress" TEXT NOT NULL,
    "username" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "poolId" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventTracking_eventType_idx" ON "EventTracking"("eventType");

-- CreateIndex
CREATE INDEX "EventTracking_blockHeight_idx" ON "EventTracking"("blockHeight");

-- CreateIndex
CREATE INDEX "EventTracking_processed_idx" ON "EventTracking"("processed");

-- CreateIndex
CREATE INDEX "VRFCallback_callerAddress_idx" ON "VRFCallback"("callerAddress");

-- CreateIndex
CREATE INDEX "VRFCallback_nonce_idx" ON "VRFCallback"("nonce");

-- CreateIndex
CREATE INDEX "VRFCallback_timestamp_idx" ON "VRFCallback"("timestamp");

-- CreateIndex
CREATE INDEX "TradeEvent_type_idx" ON "TradeEvent"("type");

-- CreateIndex
CREATE INDEX "TradeEvent_accountAddress_idx" ON "TradeEvent"("accountAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_tokenAddress_idx" ON "TradeEvent"("tokenAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_user_idx" ON "TradeEvent"("user");

-- CreateIndex
CREATE INDEX "TradeEvent_timestamp_idx" ON "TradeEvent"("timestamp");

-- CreateIndex
CREATE INDEX "PoolsDB_name_idx" ON "PoolsDB"("name");

-- CreateIndex
CREATE INDEX "PoolsDB_symbol_idx" ON "PoolsDB"("symbol");

-- CreateIndex
CREATE INDEX "PoolsDB_dev_idx" ON "PoolsDB"("dev");

-- CreateIndex
CREATE INDEX "PoolsDB_tokenAddress_idx" ON "PoolsDB"("tokenAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "users"("walletAddress");

-- CreateIndex
CREATE INDEX "comments_userId_idx" ON "comments"("userId");

-- CreateIndex
CREATE INDEX "comments_poolId_idx" ON "comments"("poolId");

-- CreateIndex
CREATE INDEX "comments_createdAt_idx" ON "comments"("createdAt");

-- CreateIndex
CREATE INDEX "likes_commentId_idx" ON "likes"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_commentId_key" ON "likes"("userId", "commentId");

-- CreateIndex
CREATE INDEX "images_commentId_idx" ON "images"("commentId");

-- CreateIndex
CREATE INDEX "Ammpair_token0Id_idx" ON "Ammpair"("token0Id");

-- CreateIndex
CREATE INDEX "Ammpair_token1Id_idx" ON "Ammpair"("token1Id");

-- AddForeignKey
ALTER TABLE "Ammpair" ADD CONSTRAINT "Ammpair_token0Id_fkey" FOREIGN KEY ("token0Id") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ammpair" ADD CONSTRAINT "Ammpair_token1Id_fkey" FOREIGN KEY ("token1Id") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "PoolsDB"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
