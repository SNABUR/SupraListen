/*
  Warnings:

  - Changed the type of `tokensClaimed` on the `TokenClaim` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TokenClaim" DROP COLUMN "tokensClaimed",
ADD COLUMN     "tokensClaimed" JSONB NOT NULL;
