import { validateAuth } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { productId } = await request.json();

    const auth = await validateAuth();
    const userId = auth?.user?.userId || null;

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session_id")?.value || null;

    const whereCondition = userId
      ? { userId, productId }
      : { sessionId, productId };

    const deleteCart = await prisma.cart.deleteMany({
      where: whereCondition,
    });

    return NextResponse.json(deleteCart, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du panier:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du panier" },
      { status: 500 }
    );
  }
}
