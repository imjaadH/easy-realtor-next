/*
  Warnings:

  - You are about to drop the column `duration` on the `contract` table. All the data in the column will be lost.
  - Made the column `startDate` on table `contract` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "contract" DROP COLUMN "duration",
ADD COLUMN     "endDate" TIMESTAMP(3),
ALTER COLUMN "startDate" SET NOT NULL;
