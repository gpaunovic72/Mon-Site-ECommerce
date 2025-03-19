"use client";

import { useEffect, useState } from "react";
import { type Products } from "../datas/productsList";

export default function Cart() {
  const [carts, setCarts] = useState<Products[]>([]);

  useEffect(() => {
    const storedCarts: Products[] = JSON.parse(
      localStorage.getItem("carts") || "[]"
    );
    setCarts(storedCarts);
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCarts = carts.filter((p) => p.id !== id);
    setCarts(updatedCarts);
    localStorage.setItem("carts", JSON.stringify(updatedCarts));
  };

  const total = carts.reduce(
    (sum, product) => sum + (product.price || 0) * (product.quantity || 1),
    0
  );
  return (
    <div className="p-6 bg-gray-300 min-h-screen flex flex-col justify-center gap-5">
      <div className="border max-w-6xl p-4 bg-white">
        <h1 className="text-3xl text-black font-bold ">Votre panier</h1>
        <p className="border-1 text-gray-300 mt-2.5" />
        {carts.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">
            Votre panier est vide
          </p>
        ) : (
          <ul className="mt-6">
            {carts.map((product) => (
              <li key={product.id} className="p-4 flex justify-between gap-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <span className="text-gray-800">Prix: {product.price} €</span>
                <p className="text-xl font-bold">
                  Quantités: {product.quantity}
                </p>
                <button className="text-green-700 font-bold">Ajouter</button>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 font-bold"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="border-1 text-gray-300 mt-2.5" />
        <p className="mt-4 font-bold text-xl text-end">Total: {total} €</p>
      </div>
    </div>
  );
}
