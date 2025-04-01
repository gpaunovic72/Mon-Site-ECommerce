"use client";
import ButtonAddProduct from "@/app/components/ButtonAddProduct";
import { productsList, type Products } from "@/app/datas/productsList";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function Items() {
  const { id } = useParams();
  const router = useRouter();

  const product: Products | undefined = productsList.find(
    (p) => p.id === parseInt(id as string)
  );
  if (!product) {
    router.push("/error");
    return null;
  }

  return (
    <div className="p-6 maw-w-4xl">
      <h1 className="text-3xl font-bold text-center">Détails du produit</h1>
      <div className="flex">
        <div className="flex flex-col items-center text-center gap-5 w-full mt-8 ">
          <Image
            src={product.picture}
            alt={`Photo de ${product.name}`}
            width={400}
            height={400}
            style={{ width: "auto", height: "400px" }}
          />
          <p className="text-gray-600 text-base font-bold">
            Prix: {product.price} €
          </p>
          <ButtonAddProduct product={product} />
        </div>
        <div className="flex flex-col gap-2.5 mt-8 p-3.5 ">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 text-base">
            Catégorie: {product.category}
          </p>
          <p className="text-gray-600 text-base whitespace-pre-line">
            Description: {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
