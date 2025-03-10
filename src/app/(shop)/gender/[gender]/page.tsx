export const revalidate = 60;

import { ProductGrid } from "@/components";

import Pagination from "@/components/ui/pagination/Pagination";
import { getPaginatedProductsWithImages } from "@/actions/products";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import Tittle from "@/components/ui/top-menu/tittle/Tittle";

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CartPage({ params, searchParams }: Props) {
  // Resuelve las promesas
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  // Extrae y maneja los valores
  const gender = resolvedParams.gender as Gender; // Asegúrate de que sea del tipo Gender
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page, 10)
    : 1;

  // Llama a la funcion con los parámetros resueltos
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender, // Ahora gender es del tipo correcto
  });

  // Redirige si no hay productos
  if (products.length === 0) {
    redirect("/");
  }
  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
  };

  return (
    <>
      <Tittle
        tittle={`Articulos de ${labels[gender]}`}
        subtitle={`Categoria de ${labels[gender]}`}
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
