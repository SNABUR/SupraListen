-- CreateTable
CREATE TABLE "BlockProgress" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "lastBlockHeight" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlockProgress_pkey" PRIMARY KEY ("id")
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
    "address" VARCHAR(200) NOT NULL,
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

-- CreateIndex
CREATE INDEX "VRFCallback_callerAddress_nonce_timestamp_idx" ON "VRFCallback"("callerAddress", "nonce", "timestamp");

-- CreateIndex
CREATE INDEX "TradeEvent_type_accountAddress_tokenAddress_user_timestamp_idx" ON "TradeEvent"("type", "accountAddress", "tokenAddress", "user", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "PoolsDB_address_key" ON "PoolsDB"("address");

-- CreateIndex
CREATE INDEX "PoolsDB_name_symbol_dev_tokenAddress_idx" ON "PoolsDB"("name", "symbol", "dev", "tokenAddress");

-- AddForeignKey
ALTER TABLE "TradeEvent" ADD CONSTRAINT "TradeEvent_tokenAddress_fkey" FOREIGN KEY ("tokenAddress") REFERENCES "PoolsDB"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
