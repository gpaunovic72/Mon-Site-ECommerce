import { z } from "zod";

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    firstname: z
      .string()
      .min(1, "Le prénom est requis")
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(20, "Le mot de passe ne pas dépasser 20 caractères"),
    confirmPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(20, "Le mot de passe ne pas dépasser 20 caractères"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les deux mots de passe ne sont pas identique",
        path: ["confirmPassword"],
      });
    }
  });
export type SignupFormData = z.infer<typeof SignupFormSchema>;
