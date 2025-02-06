/*
  Warnings:

  - You are about to drop the `Clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_manager_fkey";

-- DropTable
DROP TABLE "Clients";

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "contact" TEXT,
    "manager" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_manager_fkey" FOREIGN KEY ("manager") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
