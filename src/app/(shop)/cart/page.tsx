import TittlePage from "@/components/ui/top-menu/tittle/Tittle";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GiPadlock } from "react-icons/gi";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

const isEmpty = ProductsInCart.length === 0;


export default function CartPage() {

  // if (isEmpty) {
  //   redirect("/empty");
  // }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <TittlePage tittle="Carrito de Compras" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className="underline mb-5">
              Continua comprando
            </Link>

            <ProductsInCart />
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7 h-80  ">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
           
            <OrderSummary/>
            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>{" "}
              <div className="flex text-gray-500 text-sm items-center mx-2 justify-center mt-3">
                <GiPadlock />
                <span>Compra segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
