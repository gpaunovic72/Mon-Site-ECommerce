import { validateAuth } from "@/lib/middleware/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authResult = await validateAuth();

    if ("error" in authResult) {
      return NextResponse.json(
        { isLoggedIn: false, isAdmin: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        isLoggedIn: true,
        isAdmin: authResult.user?.role === "admin",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur lors de la vérification du rôle",
        details: error,
      },
      { status: 500 }
    );
  }
}
