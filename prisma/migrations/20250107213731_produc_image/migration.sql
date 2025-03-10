-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productImage" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productImage_fkey" FOREIGN KEY ("productImage") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
