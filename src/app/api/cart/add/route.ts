import { validateAuth } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const auth = await validateAuth(request);
    const userId = auth?.user?.userId || null;

    const { productId, quantity } = await request.json();

    if (!productId || quantity <= 0) {
      return NextResponse.json(
        { error: "Produit ou quantité invalide" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.upsert({
      where: {
        userId_productId: {
          userId: userId || 0,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        userId: userId || null,
        productId,
        quantity,
      },
    });

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout au panier" },
      { status: 500 }
    );
  }
}
