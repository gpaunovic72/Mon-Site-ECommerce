import { SignupFormData, SignupFormSchema } from "@/app/signup/schemas/schemas";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsedData = SignupFormSchema.parse(data);
    const { name, firstname, email, password } = parsedData as SignupFormData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "L'adresse email est déjà utilisée" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        firstname,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Inscription réussi",
        user: {
          id: user.id,
          name: user.name,
          firstname: user.firstname,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { status: 201 }
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
