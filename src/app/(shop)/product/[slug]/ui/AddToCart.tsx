"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProducts, Product, ValidSizes } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [Size, setSize] = useState<ValidSizes | undefined>();
  const [Quantity, setQuantity] = useState<number>(1);
  const [isSizeSelected, setisSizeSelected] = useState(false);

  const addToCart = () => {
    setisSizeSelected(true);
    if (!Size) return;

    const cartProduct: CartProducts = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: Quantity,
      size: Size,
      image: product.images[1],
    };
    addProductToCart(cartProduct);
  };

  return (
    <>
      {isSizeSelected && !Size && (
        <p className="text-red-500 text-sm fade-in ">
          Debes seleccionar una Talla*
        </p>
      )}

      <SizeSelector
        selectedSize={Size}
        availableSizes={product.sizes}
        onSizeSelected={setSize}
      />

      <QuantitySelector quantity={Quantity} onQuantitySelector={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
