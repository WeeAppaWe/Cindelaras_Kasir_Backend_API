-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "receipt" TYPE VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "orders_receipt_key" ON "orders"("receipt");
