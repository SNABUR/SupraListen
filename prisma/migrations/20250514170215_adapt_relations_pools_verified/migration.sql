/*
  Warnings:

  - You are about to drop the column `scale` on the `staking_pools` table. All the data in the column will be lost.
  - You are about to drop the column `totalBoosted` on the `staking_pools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ammpair" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "staking_pools" DROP COLUMN "scale",
DROP COLUMN "totalBoosted",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
