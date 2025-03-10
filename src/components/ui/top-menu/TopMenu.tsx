"use client";

import { useCartStore } from "@/store/cart/cart-store";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

const TopMenu = () => {
  const OpeMenu = useUiStore((state) => state.openSideMenu);
  const totalItemInCart = useCartStore((state) => state.getTotalItem());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className="font-bold">Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" className=" mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        {totalItemInCart === 0 && loaded ? (
          <IoCartOutline className="w-5 h-5 " title="Tu carrito está vacío" />
        ) : (
          <Link href="/cart" className=" mx-2">
            <div className="relative">
              {loaded && totalItemInCart > 0 && (
                <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white animate-bounce">
                  {totalItemInCart}
                </span>
              )}
              <IoCartOutline className="w-5 h-5" />
            </div>
          </Link>
        )}

        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => OpeMenu()}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};

export default TopMenu;
