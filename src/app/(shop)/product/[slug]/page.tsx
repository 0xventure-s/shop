/* eslint-disable @typescript-eslint/no-unused-vars */
export const revalidate = 604800; //7 dias

import { getProductBySklug } from "@/actions/get-product-slug";
import {
  MobileProductSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { tittleFont } from "@/config/font";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySklug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no econtrado",
    description: product?.description ?? "",

    openGraph: {
      title: product?.title ?? "Producto no econtrado",
      description: product?.description ?? "",
      images: [`/products/${product?.ProductImage[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  // Resolvemos la promesa 'params' y obtenemos el slug
  const { slug } = await params;

  const product = await getProductBySklug(slug);

  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/*SlideShow Mobile*/}

      {/*SlideShow Desktop*/}
      <div className="col-span-1 md:col-span-2">
        <MobileProductSlideshow
          tittle={product.title}
          images={product.images}
          className="block md:hidden px-0"
        />
        <ProductSlideshow
          tittle={product.title}
          images={product.images}
          className="hidden md:block "
        />
      </div>

      {/*Detalles*/}

      <div className="col-span-1 px-5">
        <h1 className={`${tittleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <StockLabel slug={product.slug} />
        <p className="text-5xl mb-5"> ${product.price}</p>
        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="text-black text-xs">{product.description}</p>
      </div>
    </div>
  );
}
