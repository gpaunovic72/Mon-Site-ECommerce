import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Le nom du produit est obligatoire"),
  price: z
    .union([z.string().transform((val) => Number(val)), z.number()])
    .refine((val) => val > 0, "Le prix doit être supérieur à 0"),
  picture: z.union([
    z
      .any()
      .transform((value) => {
        if (value instanceof FileList) return value[0];
        return value;
      })
      .refine(
        (file) =>
          ["image/jpeg", "image/png", "image/webp"].includes(file?.type),
        "Le format de la photo est invalide"
      )
      .refine(
        (file) => file.size < 1024 * 1024 * 5,
        "La photo doit être inférieure à 5MB"
      ),
    z.string().url("L'URL de l'image est invalide"),
  ]),
  description: z.string().optional(),
  categoryId: z
    .union([z.string().transform((val) => Number(val)), z.number()])
    .refine((val) => val >= 1 && val <= 5, "La catégorie est invalide"),
});

export type ProductInput = z.infer<typeof ProductSchema>;

export const DeleteProductSchema = z.object({
  id: z
    .number()
    .positive("L'ID doit être un nombre positif")
    .int("L'ID doit être un nombre entier"),
});

export type DeleteProductInput = z.infer<typeof DeleteProductSchema>;

export const UpdateProductSchema = ProductSchema.extend({
  id: z.number().int().optional(),
});

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
