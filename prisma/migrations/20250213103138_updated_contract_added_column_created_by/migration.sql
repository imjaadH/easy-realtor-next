/*
  Warnings:

  - Added the required column `createdBy` to the `contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contract" ADD COLUMN     "createdBy" TEXT NOT NULL;
