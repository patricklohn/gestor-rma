-- AlterTable
ALTER TABLE "Warranty" ADD COLUMN     "change_sn" TEXT,
ADD COLUMN     "client_prod" BOOLEAN DEFAULT false;
