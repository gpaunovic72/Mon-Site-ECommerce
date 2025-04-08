import { validateAdmin } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schéma spécifique pour la création de produit
const CreateProductSchema = z.object({
  name: z.string().min(1, "Le nom du produit est obligatoire"),
  price: z.number().positive("Le prix doit être positif"),
  picture: z.string().url("L'URL de l'image est invalide"),
  description: z.string().optional(),
  categoryId: z.number().int().positive("La catégorie est obligatoire"),
});

export async function POST(request: Request) {
  try {
    const authResult = await validateAdmin(request);
    if ("error" in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const data = await request.json();

    const validatedData = CreateProductSchema.parse(data);

    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        price: validatedData.price,
        picture: validatedData.picture,
        description: validatedData.description,
        categoryId: validatedData.categoryId,
      },
    });

    return NextResponse.json(
      { message: "Produit ajouté", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur détaillée:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: "Erreur lors de la création du produit",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
