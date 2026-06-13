/*
  Warnings:

  - Added the required column `order_type` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN "order_type" VARCHAR(20) NOT NULL DEFAULT 'DINE_IN';
