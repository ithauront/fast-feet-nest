-- CreateTable
CREATE TABLE "log_entries" (
    "id" TEXT NOT NULL,
    "package_item_id" TEXT NOT NULL,
    "previous_state" "PackageStatus" NOT NULL,
    "new_state" "PackageStatus" NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_entries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "log_entries" ADD CONSTRAINT "log_entries_package_item_id_fkey" FOREIGN KEY ("package_item_id") REFERENCES "package_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
