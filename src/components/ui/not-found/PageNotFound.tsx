import Image from "next/image";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className="text-9xl">404</h2>
        <p className="font-semibold text-xl">
          Whoops! Lo sentimos, esta página no existe
        </p>
        <p>
          <span className="text-gray-600">Pueden regresar al </span>
          <Link
            href="/"
            className="relative inline-block px-1 py-3 text-white font-semibold rounded-lg group brode"
          >
            <span className="relative block bg-black rounded-lg px-6 py-3 transition-transform transform group-hover:scale-105">
              Home -{">"}
            </span>
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image src="/imgs/starman_750x750.png" alt="Car Man Photo" height={250} width={250} className="p-5 sm:p-0"  />
      </div>
    </div>
  );
}
