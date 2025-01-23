/*
  Warnings:

  - Added the required column `autoTriggerActiveTime` to the `Lootbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autoTriggerWhitelistTime` to the `Lootbox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isWhitelisted` to the `Lootbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lootbox" ADD COLUMN     "autoTriggerActiveTime" BIGINT NOT NULL,
ADD COLUMN     "autoTriggerWhitelistTime" BIGINT NOT NULL,
ADD COLUMN     "isWhitelisted" BOOLEAN NOT NULL,
ALTER COLUMN "isActive" DROP DEFAULT;
