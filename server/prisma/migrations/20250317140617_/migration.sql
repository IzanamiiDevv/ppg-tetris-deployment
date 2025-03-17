-- CreateTable
CREATE TABLE "playerCount" (
    "id" SERIAL NOT NULL,
    "tetrisCount" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playerCount_pkey" PRIMARY KEY ("id")
);
