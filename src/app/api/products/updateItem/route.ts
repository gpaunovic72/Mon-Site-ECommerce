import { validateAdmin } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const authResult = await validateAdmin(request);
    if ("error" in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    // Extraire l'id de l'URL
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID du produit manquant" },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Vérifier si le produit existe
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Préparer les données de mise à jour
    const updateData = {
      name: data.name,
      price: data.price,
      picture: data.picture,
      description: data.description,
      categoryId: data.categoryId,
    };

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Produit mis à jour", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur détaillée lors de la mise à jour du produit:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la mise à jour du produit",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
