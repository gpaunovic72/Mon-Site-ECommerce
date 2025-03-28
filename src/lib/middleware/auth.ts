import jwt from "jsonwebtoken";

export type AuthUser = {
  userId: number;
  email: string;
  role: string;
};

export async function validateAuth(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return { error: "Token manquant", status: 401 };
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return { error: "Token invalide", status: 401 };
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

export async function validateAdmin(request: Request) {
  const authResult = await validateAuth(request);
  if ("error" in authResult) {
    return authResult;
  }

  if (authResult.user.role !== "admin") {
    return { error: "Non autorisé", status: 401 };
  }

  return authResult;
}
