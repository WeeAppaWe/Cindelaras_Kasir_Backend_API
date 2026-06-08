-- CreateTable
CREATE TABLE "cash_movements" (
    "cash_movement_id" UUID NOT NULL,
    "shift_id" UUID NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "note" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "cash_movements_pkey" PRIMARY KEY ("cash_movement_id")
);

-- AddForeignKey
ALTER TABLE "cash_movements" ADD CONSTRAINT "cash_movements_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shifts"("shift_id") ON DELETE RESTRICT ON UPDATE CASCADE;
