import { validateAuth } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { getCreateSessionId } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const auth = await validateAuth();
    const userId = auth?.user?.userId || null;

    const { productId, quantity } = await request.json();

    if (!productId || quantity <= 0) {
      return NextResponse.json(
        { error: "Produit ou quantité invalide" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    let cart;
    // Utilisateur connecté
    if (userId) {
      cart = await prisma.cart.upsert({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
        create: {
          userId,
          productId,
          quantity,
        },
      });
    } else {
      // Utilisateur non connecté
      const sessionId = await getCreateSessionId();

      cart = await prisma.cart.upsert({
        where: {
          sessionId_productId: {
            sessionId,
            productId,
          },
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
        create: {
          sessionId,
          productId,
          quantity,
        },
      });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout au panier" },
      { status: 500 }
    );
  }
}
