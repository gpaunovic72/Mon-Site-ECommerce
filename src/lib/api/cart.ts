export async function fetchPostCart(productId: number, quantity: number) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'ajout au panier");
    }

    // Déclencher l'événement pour mettre à jour le panier
    window.dispatchEvent(new Event("cartUpdated"));

    return data;
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    throw error;
  }
}

export async function fetchGetCart() {
  try {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch("/api/cart", {
      method: "GET",
      headers,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la récupération du panier");
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    throw error;
  }
}

export async function fetchUpdateCart(productId: number, quantity: number) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/cart/update", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la mise à jour du panier");
    }

    window.dispatchEvent(new Event("cartUpdated"));

    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier:", error);
    throw error;
  }
}
