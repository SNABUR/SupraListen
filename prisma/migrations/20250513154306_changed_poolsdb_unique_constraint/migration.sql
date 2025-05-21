/*
  Warnings:

  - A unique constraint covering the columns `[network]` on the table `PoolsDB` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PoolsDB_network_pool_key";

-- CreateIndex
CREATE INDEX "PoolsDB_network_pool_idx" ON "PoolsDB"("network", "pool");

-- CreateIndex
CREATE UNIQUE INDEX "PoolsDB_network_key" ON "PoolsDB"("network");
