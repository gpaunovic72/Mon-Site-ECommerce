"use client";

import ProductForm from "@/app/components/ProductForm";
import { checkAdminRole } from "@/lib/api/checkAdminRole";
import { fetchOneProduct, fetchUpdateProduct } from "@/lib/api/products";
import { uploadPictures } from "@/lib/api/uploadPictures";
import { ProductInput } from "@/lib/validations/products";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Modifier un produit",
  description: "Modifier un produit",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const isAdmin = await checkAdminRole();
      if (!isAdmin) {
        router.push("/login");
        return;
      }

      try {
        const productData = await fetchOneProduct(id as string);
        setProduct(productData);
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
        router.push("/error");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, router]);

  const handleSubmit = async (data: ProductInput) => {
    if (!id || !product) return;

    try {
      let pictureUrl = product.picture || "";

      if (data.picture instanceof File) {
        pictureUrl = await uploadPictures(data.picture);
      }

      const productData = {
        ...product,
        name: data.name,
        price: data.price,
        description: data.description || "",
        picture: pictureUrl,
        categoryId: data.categoryId,
      };

      await fetchUpdateProduct(id as string, productData);
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Produit non trouvé</p>
      </div>
    );
  }

  const initialData: ProductInput = {
    name: product.name,
    price: Number(product.price),
    description: product.description || "",
    picture: product.picture || "",
    categoryId: product.categoryId,
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-10 mt-10">Modifier un produit</h1>
      <ProductForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
