"use Client";
import { Product } from "@prisma/client";

type ButtonAddProductProps = {
  product: Product;
};

export default function ButtonAddProduct({ product }: ButtonAddProductProps) {
  const addToCart = () => {
    console.log("Ajout de ", product);
    const currentCarts: Product[] = JSON.parse(
      localStorage.getItem("carts") || "[]"
    );

    const existingProduct = currentCarts.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      currentCarts.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("carts", JSON.stringify(currentCarts));
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
