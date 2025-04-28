"use client";

import { checkAdminRole } from "@/lib/api/checkAdminRole";
import { fetchCreateProduct } from "@/lib/api/products";
import { uploadPictures } from "@/lib/api/uploadPictures";
import { ProductInput } from "@/lib/validations/products";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";

export const metadata: Metadata = {
  title: "Ajouter un produit | Mon Site E-Commerce",
  description: "Ajoutez un nouveau produit à votre boutique en ligne.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AddProducts() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const isAdmin = await checkAdminRole();
      setIsLoading(false);
      if (!isAdmin) {
        router.push("/login");
      }
    };
    checkAdmin();
  }, [router]);

  const onSubmit = async (data: ProductInput) => {
    try {
      const pictureUrl = await uploadPictures(data.picture);
      await fetchCreateProduct({
        name: data.name,
        price: data.price,
        picture: pictureUrl,
        description: data.description || "",
        categoryId: data.categoryId,
      });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-10 mt-10">Ajouter un produit</h1>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
}
