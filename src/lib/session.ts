import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function getCreateSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("cart_session_id")?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set("cart_session_id", sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return sessionId;
}
