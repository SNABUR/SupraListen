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
