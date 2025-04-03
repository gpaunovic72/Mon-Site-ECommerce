import { Product } from "@prisma/client";

export async function fetchProducts(): Promise<Product[]> {
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
}

export async function fetchProductOneProduct(id: string): Promise<Product> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/getOneItem/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du produit");
  }
  return response.json();
}
