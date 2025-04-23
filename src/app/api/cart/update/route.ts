import { validateAuth } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();

    const auth = await validateAuth(request);
    const userId = auth?.user?.userId || null;

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session_id")?.value || null;

    if (userId) {
      const updateCart = await prisma.cart.update({
        where: {
          userId_productId: {
            userId: userId,
            productId: productId,
          },
        },
        data: {
          quantity,
        },
      });
      return NextResponse.json(updateCart, { status: 200 });
    } else {
      const updateCart = await prisma.cart.update({
        where: {
          sessionId_productId: {
            sessionId: sessionId || "",
            productId: productId,
          },
        },
        data: {
          quantity,
        },
      });
      return NextResponse.json(updateCart, { status: 200 });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du panier" },
      { status: 500 }
    );
  }
}
