"use client";

import { useAdminRole } from "@/hooks/useAdminRole";
import { checkAdminRole } from "@/lib/api/checkAdminRole";
import { fetchDeleteProduct } from "@/lib/api/products";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";
type CardProps = {
  products: Product[];
  selectedCategory: string | null;
  search: string;
};

export default function Card({
  products,
  selectedCategory,
  search,
}: CardProps) {
  const router = useRouter();
  const { isAdmin } = useAdminRole();

  const handleDeleteProduct = async (product: Product) => {
    try {
      const isAdmin = await checkAdminRole();
      if (!isAdmin) {
        router.push("/login");
        return;
      }
      await fetchDeleteProduct(product.id.toString());
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  let filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.categoryId === Number(selectedCategory)
      )
    : products;

  filteredProducts = search
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : filteredProducts;

  return (
    <div
      id="items"
      className="bg-white py-8 px-10 w-full flex flex-col justify-center"
    >
      <h2 className="text-black text-2xl font-bold text-center">
        Nos produits
      </h2>
      <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-5 text-center">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-[#C4C4C4] bg-[#CCCCCC] rounded-2xl flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-square w-full flex items-center justify-center bg-white rounded-t-2xl p-4">
              <div className="relative w-full h-[200px]">
                <Image
                  src={product.picture || ""}
                  alt={`Photo de ${product.name}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            <div className="flex flex-col p-4 gap-3 flex-grow justify-between">
              <div>
                <h3 className="text-center text-black font-bold px-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-center text-black font-medium text-lg mt-2">
                  {product.price?.toString() || "0"} €
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Button
                  href={`/items/${product.id}`}
                  text="Voir plus"
                  className="bg-black text-white font-bold cursor-pointer hover:bg-gray-800 hover:scale-105 transition-colors duration-300 text-sm sm:text-base"
                />
                {isAdmin && (
                  <div className="flex gap-2 w-full">
                    <Button
                      href={`/editProduct/${product.id}`}
                      text="Modifier"
                      className="bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 hover:scale-105 transition-colors duration-300 text-xs sm:text-sm"
                    />
                    <Button
                      href="/"
                      onClick={() => handleDeleteProduct(product)}
                      text="Supprimer"
                      className="bg-red-500 text-white font-bold cursor-pointer hover:bg-red-600 hover:scale-105 transition-colors duration-300 text-xs sm:text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
