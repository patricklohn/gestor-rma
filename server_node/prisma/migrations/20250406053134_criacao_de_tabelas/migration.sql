-- CreateTable
CREATE TABLE "Enterprise" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "document" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enterprise_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Person" (
    "uuid" TEXT NOT NULL,
    "client" BOOLEAN NOT NULL,
    "supplier" BOOLEAN,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "observation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Product" (
    "uuid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "observation" TEXT,
    "reatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Warranty" (
    "uuid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serial_number" TEXT,
    "data_start" TIMESTAMP(3) NOT NULL,
    "data_buy" TIMESTAMP(3),
    "data_end" TIMESTAMP(3),
    "productId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "invoice" TEXT,
    "invoice_arq" TEXT,
    "status" TEXT NOT NULL,
    "defect" TEXT NOT NULL,
    "notes" TEXT,
    "order_service" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Warranty_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Person"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Person"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
