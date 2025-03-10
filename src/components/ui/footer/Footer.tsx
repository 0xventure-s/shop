import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex justify-center w-full text-xs mb-10 gap-x-1 ">
      <Link href="/">
        <span>Teslo {new Date().getFullYear()} |</span>
      </Link>
      <Link href="/">
        <span>Terminos y Condiciones |</span>
      </Link>
      <Link href="/">
        <span>Politica de Privacidad</span>
      </Link>
    </div>
  );
};
