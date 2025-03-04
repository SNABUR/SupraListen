-- CreateTable
CREATE TABLE "Ammpair" (
    "id" SERIAL NOT NULL,
    "pair" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "token0" TEXT NOT NULL,
    "token1" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ammpair_pkey" PRIMARY KEY ("id")
);
