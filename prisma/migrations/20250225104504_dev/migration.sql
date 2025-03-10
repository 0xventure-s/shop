/*
  Warnings:

  - Added the required column `address` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "address2" TEXT;
