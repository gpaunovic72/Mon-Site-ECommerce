import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, { message: "Le nom est obligatoire" }),
  picture: z
    .any()
    .transform((value) => {
      if (value instanceof FileList) {
        return value[0];
      }
      return value;
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Le format de la photo est invalide",
      }
    )
    .refine((file) => file.size < 1024 * 1024 * 5, {
      message: "La photo doit être inférieure à 5MB",
    }),
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Le prix doit être supérieur à 0",
    }),
  description: z.string().optional(),
  categoryId: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 1 && val <= 5, {
      message: "La catégorie est invalide",
    }),
});

export type AddProductInput = z.infer<typeof addProductSchema>;
