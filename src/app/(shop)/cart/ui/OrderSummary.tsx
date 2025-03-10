"use client";

import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const { getSummaryInformation } = useCartStore();

  const { itemInCart, subTotal, tax, total } = getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="grid grid-cols-2">
      <span>Nro. Articulos</span>
      <span className="text-right"> {itemInCart}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos 15%</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total</span>
      <span className="text-2xl mt-5 text-right">{currencyFormat(total)}</span>
    </div>
  );
};
