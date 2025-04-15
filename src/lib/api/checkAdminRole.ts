export async function checkAdminRole() {
  const token = localStorage.getItem("token");
  if (!token) {
    return { isAdmin: false };
  }
  const session = await fetch("/api/auth/checkRole", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!session.ok) {
    return { isAdmin: false };
  }
  return session.json();
}
