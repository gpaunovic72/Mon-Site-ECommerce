"use Client";
import { fetchPostCart } from "@/lib/api/cart";
import { Product } from "@prisma/client";
import { useState } from "react";

type ButtonAddProductProps = {
  product: Product;
};

export default function ButtonAddProduct({ product }: ButtonAddProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchPostCart(product.id, 1);

      // Si un nouveau sessionId est créé, on le sauvegarde
      if (result.newSessionId) {
        localStorage.setItem("cartSessionId", result.newSessionId);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={addToCart}
        disabled={isLoading}
        className="rounded-4xl py-3 px-10 bg-green-300 hover:bg-green-400 font-bold cursor-pointer 
      text-center"
      >
        {isLoading ? "Ajout en cours..." : "Ajouter au panier"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
