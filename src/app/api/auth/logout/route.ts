import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // Supprimer le cookie token
  cookieStore.delete("token");

  return NextResponse.json(
    { message: "Déconnexion réussie" },
    {
      status: 200,
      headers: {
        "Set-Cookie": "token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict",
      },
    }
  );
}
