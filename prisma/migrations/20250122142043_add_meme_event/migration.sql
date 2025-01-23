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
    "tokenDecimals" INTEGER NOT NULL,
    "twitter" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PoolsDB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PoolsDB_name_idx" ON "PoolsDB"("name");

-- CreateIndex
CREATE INDEX "PoolsDB_symbol_idx" ON "PoolsDB"("symbol");

-- CreateIndex
CREATE INDEX "PoolsDB_dev_idx" ON "PoolsDB"("dev");
