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
