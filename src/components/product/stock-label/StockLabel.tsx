"use client";

import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [Stock, setStock] = useState<number>(0);
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);

    setStock(inStock);
    SetIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="text-xs text-gray-500 mb-5 animate-pulse bg-blue-200 w-1/2 anima">
          &nbsp;
        </div>
      ) : (
        <h1 className="text-xs text-gray-500 mb-5">{Stock} Unidades disponibles</h1>
      )}
    </>
  );
};
