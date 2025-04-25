"use client";

import { ProductInput, ProductSchema } from "@/lib/validations/products";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";

type ProductFormProps = {
  initialData?: ProductInput | null;
  onSubmit: (data: ProductInput) => Promise<void>;
  isSubmitting?: boolean;
};

export default function ProductForm({
  initialData = null,
  onSubmit,
  isSubmitting = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
    reset,
  } = useForm<ProductInput>({
    resolver: zodResolver(ProductSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.picture || null
  );
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setUploadProgress(0);
    }
  };

  const handleFormSubmit = async (data: ProductInput) => {
    try {
      setUploadProgress(50);
      await onSubmit(data);
      reset();
      setPreviewUrl(null);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(null), 1000);
    } catch (error) {
      setUploadProgress(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 max-w-md w-full"
    >
      <div className="flex flex-col gap-4">
        {previewUrl && (
          <div className="relative">
            <Image
              src={previewUrl}
              alt="Prévisualisation de l'image"
              width={300}
              height={300}
              style={{ width: "auto", height: "300px" }}
              className="rounded-md"
            />
            {uploadProgress !== null && (
              <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-2">
                <div
                  className="bg-blue-500 h-2 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label htmlFor="fileInput" className="text-sm font-medium">
              Image du produit
            </label>
            <input
              {...register("picture", { onChange: handleFileChange })}
              type="file"
              id="fileInput"
              accept="image/*"
              name="picture"
              className="border-2 border-gray-300 rounded-md p-2 cursor-pointer hover:border-blue-500 transition-colors"
              disabled={isSubmitting || isFormSubmitting}
            />
            {errors.picture && (
              <p className="text-red-500 text-sm">
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
              {...register("name")}
              type="text"
              id="name"
              className="border-2 border-gray-300 rounded-md p-2 hover:border-blue-500 transition-colors"
              disabled={isSubmitting || isFormSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="price"
              className="text-sm font-bold border-b-2 border-gray-300"
            >
              Prix du produit
            </label>
            <input
              {...register("price")}
              type="number"
              id="price"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="description"
              className="text-sm font-bold border-b-2 border-gray-300"
            >
              Description du produit
            </label>
            <textarea
              {...register("description")}
              id="description"
              className="border-2 border-gray-300 rounded-md p-2"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message?.toString()}
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
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded-md mt-4 
        disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 
        focus:outline-none focus:ring-2 focus:ring-green-500 
        focus:ring-opacity-50 "
        disabled={isSubmitting || isFormSubmitting}
      >
        {isSubmitting || isFormSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner />
            <span>Enregistrement...</span>
          </div>
        ) : (
          "Enregistrer"
        )}
      </button>
    </form>
  );
}
