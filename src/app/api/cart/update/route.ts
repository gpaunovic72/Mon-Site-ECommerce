import { validateAuth } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();

    const auth = await validateAuth();
    const userId = auth?.user?.userId || null;

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session_id")?.value || null;

    const whereCondition = userId
      ? { userId_productId: { userId, productId } }
      : { sessionId_productId: { sessionId: sessionId || "", productId } };

    const updateCart = await prisma.cart.update({
      where: whereCondition,
      data: {
        quantity,
      },
    });

    return NextResponse.json(updateCart, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du panier" },
      { status: 500 }
    );
  }
}
