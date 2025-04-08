import { Product } from "@prisma/client";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/getItems`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits");
    }

    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
    throw error;
  }
}

export async function fetchOneProduct(id: string): Promise<Product> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/getOneItem?id=${id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du produit");
    }
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération du produit", error);
    throw error;
  }
}

export async function fetchUpdateProduct(
  id: string,
  product: {
    name: string;
    price: number;
    picture: string;
    description?: string;
    categoryId: number;
  }
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/updateItem?id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du produit");
    }
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit", error);
    throw error;
  }
}

export async function fetchDeleteProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/deleteItem?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du produit");
    }
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la suppression du produit", error);
    throw error;
  }
}

export async function fetchCreateProduct(data: {
  picture: string;
  name: string;
  price: number;
  description?: string;
  categoryId: number;
}): Promise<Product> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/createItem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la création du produit");
    }

    return response.json();
  } catch (error) {
    console.error("Erreur lors de la création du produit", error);
    throw error;
  }
}
