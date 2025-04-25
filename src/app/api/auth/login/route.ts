import { LoginFormData, LoginFormSchema } from "@/app/login/schemas/schemas";
import { mergeCartItems } from "@/lib/mergeCartItem";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsedData = LoginFormSchema.parse(data);
    const { email, password: inputPassword } = parsedData as LoginFormData;

    const userWithoutPassword = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!userWithoutPassword) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      inputPassword,
      userWithoutPassword.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        firstname: true,
        email: true,
        role: true,
      },
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("Missing JWT_SECRET environment variable");
    }

    const token = jwt.sign(
      {
        userId: user?.id,
        email: user?.email,
        role: user?.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session_id")?.value;

    if (sessionId && user) {
      await mergeCartItems(user.id, sessionId);

      cookieStore.delete("cart_session_id");
    }

    return NextResponse.json(
      {
        message: "Connexion réussie",
        user: {
          id: user?.id,
          name: user?.name,
          firstname: user?.firstname,
        },
      },
      {
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure`,
        },
        status: 200,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
