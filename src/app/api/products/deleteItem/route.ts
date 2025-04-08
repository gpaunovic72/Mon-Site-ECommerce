import { validateAdmin } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const authResult = await validateAdmin(request);
    if ("error" in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID du produit manquant" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Produit supprimé", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du produit" },
      { status: 500 }
    );
  }
}
