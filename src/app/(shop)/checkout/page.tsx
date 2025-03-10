import TittlePage from "@/components/ui/top-menu/tittle/Tittle";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { GiPadlock } from "react-icons/gi";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <TittlePage tittle="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito aqui
            </Link>

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5 ">
                <Image
                  width={100}
                  height={100}
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  style={{ width: 100, height: 100 }}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>

                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Fernando Herrera</p>
              <p>Av Presidente Castillo 699</p>
              <p>Catucho landia</p>
              <p>CP 4700</p>
              <p>Dni:41844206</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"/>

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>Nro. Productos</span>
              <span className="text-right">3 Articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos 15%</span>
              <span className="text-right">$100</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Pagar
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
