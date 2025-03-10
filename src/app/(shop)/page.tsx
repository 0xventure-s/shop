export const revalidate = 60



import { getPaginatedProductsWithImages } from "@/actions/products";
import { ProductGrid } from "@/components";
import Pagination from "@/components/ui/pagination/Pagination";
import Tittle from "@/components/ui/top-menu/tittle/Tittle";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{page?: string}>
}

export default async function Home({ searchParams }: Props) {
  // Resolvemos searchParams una sola vez
  const resolvedSearchParams = await searchParams;

  // Obtenemos el valor de 'page' o usamos 1 si no existe
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;

  // Llamamos a la función de paginación
  const { products, totalPages } = await getPaginatedProductsWithImages({ page });


  

  if(products.length === 0) {
    redirect("/") //Never
  }




  return (
    <>
      <Tittle tittle="Tienda" subtitle="Todos los productos" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages}/>
    </>
  );
}
 