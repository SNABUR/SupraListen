-- AlterTable
ALTER TABLE "staking_pools" ADD COLUMN     "cachedApy" TEXT,
ADD COLUMN     "cachedStakerCount" INTEGER,
ADD COLUMN     "cachedTvlUsd" TEXT,
ADD COLUMN     "totalStakedAmount" TEXT NOT NULL DEFAULT '0';

-- CreateTable
CREATE TABLE "user_stakes" (
    "id" SERIAL NOT NULL,
    "poolId" INTEGER NOT NULL,
    "userNetwork" TEXT NOT NULL,
    "userAddress" TEXT NOT NULL,
    "stakedAmount" TEXT NOT NULL,
    "rewardDebt" TEXT NOT NULL DEFAULT '0',
    "lastClaimTimestamp" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_stakes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_stakes_poolId_idx" ON "user_stakes"("poolId");

-- CreateIndex
CREATE INDEX "user_stakes_userNetwork_userAddress_idx" ON "user_stakes"("userNetwork", "userAddress");

-- CreateIndex
CREATE INDEX "user_stakes_poolId_userNetwork_userAddress_stakedAmount_idx" ON "user_stakes"("poolId", "userNetwork", "userAddress", "stakedAmount");

-- CreateIndex
CREATE UNIQUE INDEX "user_stakes_poolId_userNetwork_userAddress_key" ON "user_stakes"("poolId", "userNetwork", "userAddress");

-- CreateIndex
CREATE INDEX "staking_pools_network_totalStakedAmount_idx" ON "staking_pools"("network", "totalStakedAmount");

-- CreateIndex
CREATE INDEX "staking_pools_network_cachedApy_idx" ON "staking_pools"("network", "cachedApy");

-- AddForeignKey
ALTER TABLE "user_stakes" ADD CONSTRAINT "user_stakes_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "staking_pools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stakes" ADD CONSTRAINT "user_stakes_userNetwork_userAddress_fkey" FOREIGN KEY ("userNetwork", "userAddress") REFERENCES "users"("network", "walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;
