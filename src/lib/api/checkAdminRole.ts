export async function checkAdminRole() {
  const token = localStorage.getItem("token");
  const session = await fetch("/api/auth/checkRole", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!session.ok) {
    return false;
  }
  return session.json();
}
