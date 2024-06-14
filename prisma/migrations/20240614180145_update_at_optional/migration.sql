-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "courier" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "package_item" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recipient" ALTER COLUMN "updated_at" DROP NOT NULL;
