"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {


  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const deleteProduct = useCartStore((state) => state.deleteProduct);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5 ">
          <Image
            width={100}
            height={100}
            src={`/products/${product.image}`}
            alt={product.title}
            style={{ width: 100, height: 100 }}
            className="mr-5 rounded"
          />

          <div>
            <Link href={`/product/${product.slug}`}>
              <p className="underline"> {product.size} - {product.title}</p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantitySelector={(value) => updateProductQuantity(product,value)}
            />

            <button onClick={() => deleteProduct(product)} className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
