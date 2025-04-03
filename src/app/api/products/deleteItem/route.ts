import { validateAdmin } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { DeleteProductSchema } from "@/lib/validations/products";
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

    const data = await request.json();
    const validatedData = DeleteProductSchema.parse(data);

    const product = await prisma.product.delete({
      where: { id: validatedData.id },
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
