-- AlterTable
ALTER TABLE "Ammpair" ADD COLUMN     "apr24h" TEXT,
ADD COLUMN     "apyCalculated" TEXT,
ADD COLUMN     "lastStatsUpdate" TIMESTAMP(3),
ADD COLUMN     "lpFeePercent" TEXT,
ADD COLUMN     "reserve0" TEXT,
ADD COLUMN     "reserve1" TEXT,
ADD COLUMN     "tvlUsd" TEXT,
ADD COLUMN     "volumeToken0_24h" TEXT,
ADD COLUMN     "volumeToken1_24h" TEXT,
ADD COLUMN     "volumeUsd24h" TEXT;

-- CreateIndex
CREATE INDEX "Ammpair_network_tvlUsd_idx" ON "Ammpair"("network", "tvlUsd");

-- CreateIndex
CREATE INDEX "Ammpair_network_volumeUsd24h_idx" ON "Ammpair"("network", "volumeUsd24h");

-- CreateIndex
CREATE INDEX "Ammpair_network_apr24h_idx" ON "Ammpair"("network", "apr24h");
