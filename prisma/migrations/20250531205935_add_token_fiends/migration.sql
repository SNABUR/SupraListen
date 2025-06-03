-- DropIndex
DROP INDEX "tokens_network_displayOrder_idx";

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "circulatingSupply" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "marketCapUsd" TEXT,
ADD COLUMN     "priceChange24hPercent" DECIMAL(18,4),
ADD COLUMN     "priceUsdCurrent" DECIMAL(36,18),
ADD COLUMN     "totalSupply" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "volume24hUsd" TEXT;

-- CreateTable
CREATE TABLE "protocol_stats" (
    "id" SERIAL NOT NULL,
    "network" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "totalTvlUsd" DECIMAL(36,6),
    "ammTvlUsd" DECIMAL(36,6),
    "virtualPoolsTvlUsd" DECIMAL(36,6),
    "stakingTvlUsd" DECIMAL(36,6),
    "totalVolume24hUsd" DECIMAL(36,6),
    "ammVolume24hUsd" DECIMAL(36,6),
    "totalUniqueUsers" INTEGER,
    "totalFeesEarnedUsd24h" DECIMAL(36,6),

    CONSTRAINT "protocol_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_price_history" (
    "id" SERIAL NOT NULL,
    "network" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "granularity" TEXT NOT NULL,
    "openUsd" DECIMAL(36,18),
    "highUsd" DECIMAL(36,18),
    "lowUsd" DECIMAL(36,18),
    "closeUsd" DECIMAL(36,18),
    "volumeUsd" DECIMAL(36,6),

    CONSTRAINT "token_price_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_prices" (
    "id" SERIAL NOT NULL,
    "network" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "priceUsd" DECIMAL(36,18),
    "priceAnchor" DECIMAL(36,18),
    "source" TEXT,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "protocol_stats_network_timestamp_idx" ON "protocol_stats"("network", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "protocol_stats_network_timestamp_key" ON "protocol_stats"("network", "timestamp");

-- CreateIndex
CREATE INDEX "token_price_history_network_tokenAddress_granularity_timest_idx" ON "token_price_history"("network", "tokenAddress", "granularity", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "token_price_history_network_tokenAddress_timestamp_granular_key" ON "token_price_history"("network", "tokenAddress", "timestamp", "granularity");

-- CreateIndex
CREATE INDEX "token_prices_network_lastUpdatedAt_idx" ON "token_prices"("network", "lastUpdatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "token_prices_network_tokenAddress_key" ON "token_prices"("network", "tokenAddress");

-- CreateIndex
CREATE INDEX "tokens_network_marketCapUsd_idx" ON "tokens"("network", "marketCapUsd");

-- CreateIndex
CREATE INDEX "tokens_network_volume24hUsd_idx" ON "tokens"("network", "volume24hUsd");

-- CreateIndex
CREATE INDEX "tokens_network_priceChange24hPercent_idx" ON "tokens"("network", "priceChange24hPercent");
