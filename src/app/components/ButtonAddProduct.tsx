"use Client";
import { fetchPostCart } from "@/lib/api/cart";
import { Product } from "@prisma/client";
type ButtonAddProductProps = {
  product: Product;
};

export default function ButtonAddProduct({ product }: ButtonAddProductProps) {
  const addToCart = async () => {
    try {
      const cart = await fetchPostCart(product.id, 1);
      if (!cart) return;
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };

  return (
    <button
      onClick={addToCart}
      className="rounded-4xl py-3 px-10 bg-green-300 hover:bg-green-400 font-bold cursor-pointer text-center"
    >
      Ajouter au panier
    </button>
  );
}
