/*
  Warnings:

  - Added the required column `circulatingSupply` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokensBurned` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "circulatingSupply" BIGINT NOT NULL,
ADD COLUMN     "tokensBurned" BIGINT NOT NULL;
