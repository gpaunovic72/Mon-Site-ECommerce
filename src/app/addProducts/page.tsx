"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddProductInput, addProductSchema } from "./schemas/schemas";

export default function AddProducts() {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductInput>({
    resolver: zodResolver(addProductSchema),
    mode: "onChange",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: AddProductInput) => {
    try {
      const formData = new FormData();
      formData.append("picture", data.picture);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(
          errorData.error || "Erreur lors de l'upload de l'image"
        );
      }
      const uploadResult = await uploadResponse.json();
      const pictureUrl = uploadResult.url;

      const productResponse = await fetch("/api/products/createItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          picture: pictureUrl,
          name: data.name,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
        }),
      });
      if (!productResponse.ok) {
        const errorData = await productResponse.json();
        throw new Error(
          errorData.error || "Erreur lors de la création du produit"
        );
      }

      reset();
      setPreviewUrl(null);
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-10 mt-10">Ajouter un produit</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-screen"
      >
        <div className="flex flex-col gap-4">
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Produits"
              width={300}
              height={300}
              style={{ width: "auto", height: "300px" }}
              className="rounded-md "
            />
          )}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="fileInput"
                className="text-sm font-bold border-b-2 border-gray-300"
              >
                Ajouter un produit
              </label>
              <input
                {...register("picture", {
                  onChange: handleFileChange,
                })}
                type="file"
                id="fileInput"
                className="border-2 border-gray-300 rounded-md p-2 cursor-pointer"
                accept="image/*"
              />
              {errors.picture && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.picture.message?.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="name"
                className="text-sm font-bold border-b-2 border-gray-300"
              >
                Nom du produit
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="border-2 border-gray-300 rounded-md p-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="price"
                className="text-sm font-bold border-b-2 border-gray-300"
              >
                Prix
              </label>
              <input
                type="number"
                id="price"
                {...register("price")}
                className="border-2 border-gray-300 rounded-md p-2"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="description"
                className="text-sm font-bold border-b-2 border-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                className="border-2 border-gray-300 rounded-md p-2"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="category"
                className="text-sm font-bold border-b-2 border-gray-300"
              >
                Catégorie
              </label>
              <select
                id="category"
                {...register("categoryId")}
                className="border-2 border-gray-300 rounded-md p-2"
              >
                <option value="2">Chaussures</option>
                <option value="3">Sport</option>
                <option value="4">Jeux-Vidéo</option>
                <option value="5">Électronique</option>
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white p-2 rounded-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Ajout en cours..." : "Ajouter"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
