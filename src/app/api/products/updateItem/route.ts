import { validateAdmin } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { UpdateProductSchema } from "@/lib/validations/products";
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

    const data = await request.json();
    const validatedData = UpdateProductSchema.parse(data);

    const product = await prisma.product.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        price: validatedData.price,
        picture: validatedData.picture,
        description: validatedData.description,
        categoryId: validatedData.categoryId,
      },
    });

    return NextResponse.json(
      { message: "Produit mis à jour", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du produit" },
      { status: 500 }
    );
  }
}
