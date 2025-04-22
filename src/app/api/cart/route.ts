import { validateAuth } from "@/lib/middleware/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const auth = await validateAuth(request);
    const userId = auth?.user?.userId || null;

    if (userId) {
      const cart = await prisma.cart.findMany({
        where: {
          userId: userId,
        },
        include: {
          product: true,
        },
      });
      return NextResponse.json(cart, { status: 200 });
    } else {
      const cookieStore = await cookies();
      const sessionId = cookieStore.get("cart_session_id")?.value || null;

      if (!sessionId) {
        return NextResponse.json([], { status: 200 });
      }

      const cart = await prisma.cart.findMany({
        where: {
          sessionId: sessionId,
        },
        include: {
          product: true,
        },
      });
      return NextResponse.json(cart, { status: 200 });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du panier" },
      { status: 500 }
    );
  }
}
