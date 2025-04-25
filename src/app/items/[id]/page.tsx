"use client";
import ButtonAddProduct from "@/app/components/ButtonAddProduct";
import { fetchOneProduct } from "@/lib/api/products";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Items() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchOneProduct(id as string);

      if (!productData) {
        router.push("/error");
        return;
      }
      setProduct(productData);
    };
    loadProduct();
    setLoading(false);
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></span>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-md bg-white rounded-lg overflow-hidden">
              <Image
                src={product.picture || ""}
                alt={`Photo de ${product.name}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="mt-2">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price?.toString() || "0"} €
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Description
              </h2>
              <p className="mt-2 text-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <ButtonAddProduct product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
