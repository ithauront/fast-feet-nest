-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('AWAITING_PICKUP', 'IN_TRANSIT', 'DELIVERED', 'RETURNED', 'LOST');

-- CreateEnum
CREATE TYPE "CourierStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ON_VACATION', 'DISMISSED');

-- CreateTable
CREATE TABLE "recipient" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adress" TEXT NOT NULL,

    CONSTRAINT "recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courier" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "status" "CourierStatus" NOT NULL DEFAULT 'ACTIVE',
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "courier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_item" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "courier_id" TEXT,
    "recipient_id" TEXT NOT NULL,
    "status" "PackageStatus" NOT NULL DEFAULT 'AWAITING_PICKUP',

    CONSTRAINT "package_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "package_item_id" TEXT,
    "isImmutable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipient_email_key" ON "recipient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_cpf_key" ON "admin"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "courier_email_key" ON "courier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "courier_cpf_key" ON "courier"("cpf");

-- AddForeignKey
ALTER TABLE "package_item" ADD CONSTRAINT "package_item_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "courier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_item" ADD CONSTRAINT "package_item_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_package_item_id_fkey" FOREIGN KEY ("package_item_id") REFERENCES "package_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
