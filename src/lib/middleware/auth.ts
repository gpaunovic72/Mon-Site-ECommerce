import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export type AuthUser = {
  userId: number;
  email: string;
  role: string;
};

export async function validateAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Token manquant", status: 401 };
  }

  if (!process.env.JWT_SECRET) {
    return { error: "JWT_SECRET manquant", status: 500 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthUser;
    return { user: decoded };
  } catch (error) {
    return { error: "Token invalide", status: 401, details: error };
  }
}

export async function validateAdmin() {
  const authResult = await validateAuth();
  if ("error" in authResult) {
    return authResult;
  }

  if (authResult.user.role !== "admin") {
    return { error: "Non autorisé", status: 401 };
  }

  return authResult;
}
