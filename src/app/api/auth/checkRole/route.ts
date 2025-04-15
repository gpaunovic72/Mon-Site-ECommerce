import { validateAuth } from "@/lib/middleware/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authResult = await validateAuth(request);

    return NextResponse.json(
      { isAdmin: authResult.user?.role === "admin" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        isAdmin: false,
        error: "Erreur lors de la vérification du rôle",
        details: error,
      },
      { status: 500 }
    );
  }
}
