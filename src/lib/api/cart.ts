export async function fetchPostCart(productId: number, quantity: number) {
  try {
    const token = localStorage.getItem("token");
    const sessionId = localStorage.getItem("sessionId");

    const response = await fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        sessionId: sessionId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'ajout au panier");
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    throw error;
  }
}
