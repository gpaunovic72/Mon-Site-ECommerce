export async function fetchPostCart(productId: number, quantity: number) {
  try {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch("/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
    const response = await fetch("/api/cart/update", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
      headers: {
        "Content-Type": "application/json",
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

export async function fetchDeleteCart(productId: number) {
  try {
    const response = await fetch("/api/cart/delete", {
      method: "DELETE",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la suppression du panier");
    }

    window.dispatchEvent(new Event("cartUpdated"));

    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression du panier:", error);
    throw error;
  }
}
