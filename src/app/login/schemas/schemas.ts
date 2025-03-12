import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Adresse email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(20, "Le mot de passe ne pas pas dépasser 20 caractères"),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
