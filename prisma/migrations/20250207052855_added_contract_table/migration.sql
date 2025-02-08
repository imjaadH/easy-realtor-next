/*
  Warnings:

  - You are about to drop the column `rentPerMonth` on the `property` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('Active', 'Terminated', 'Completed');

-- AlterTable
ALTER TABLE "property" DROP COLUMN "rentPerMonth";

-- CreateTable
CREATE TABLE "contract" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 30,
    "description" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'Active',
    "startDate" TIMESTAMP(3),
    "costPerMonth" DECIMAL(9,2) DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
