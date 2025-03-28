import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Le nom du produit est obligatoire"),
  // price: z.number().positive("Le prix doit être un nombre positif"),
  // picture: z.string().optional(),
  // description: z.string().optional(),
  // categoryId: z
  //   .number()
  //   .positive("Le numéro de catégorie doit être un nombre positif")
  //   .min(1, "Le numéro de catégorie doit être entre 1 et 5")
  //   .max(5, "Le numéro de catégorie doit être entre 1 et 5")
  //   .int("Le numéro de catégorie doit être un nombre entier"),
});

export type ProductInput = z.infer<typeof ProductSchema>;

export const DeleteProductSchema = z.object({
  id: z
    .number()
    .positive("L'ID doit être un nombre positif")
    .int("L'ID doit être un nombre entier"),
});

export type DeleteProductInput = z.infer<typeof DeleteProductSchema>;

export const UpdateProductSchema = z.object({
  id: z.number().int().readonly(),
  name: z.string().min(1, "Le nom du produit est obligatoire"),
  price: z.number().positive("Le prix doit être un nombre positif"),
  picture: z.string().optional(),
  description: z.string().optional(),
  categoryId: z
    .number()
    .positive("Le numéro de catégorie doit être un nombre positif")
    .int("Le numéro de catégorie doit être un nombre entier")
    .min(1, "Le numéro de catégorie doit être entre 1 et 5")
    .max(5, "Le numéro de catégorie doit être entre 1 et 5"),
});

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
