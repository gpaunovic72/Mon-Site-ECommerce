"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
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

  const updateQuantity = (id: number, change: number) => {
    const updatedCarts = carts.map((product) => {
      if (product.id === id) {
        const newQuantity = (product.quantity || 1) + change;
        if (newQuantity > 0) {
          return { ...product, quantity: newQuantity };
        }
      }
      return product;
    });

    setCarts(updatedCarts);
    localStorage.setItem("carts", JSON.stringify(updatedCarts));
  };

  const total = carts.reduce(
    (sum, product) => sum + (product.price || 0) * (product.quantity || 1),
    0
  );
  return (
    <div className="p-6 bg-gray-300 min-h-screen flex flex-col justify-center gap-5">
      <div className="border max-w-6xl p-4 bg-white mx-auto w-full">
        <h1 className="text-3xl text-black font-bold mb-4">Votre panier</h1>
        <div className="border-b border-gray-200 mb-4" />

        {carts.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">
            Votre panier est vide
          </p>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-50 font-bold">
              <div>Produit</div>
              <div className="text-center">Prix</div>
              <div className="text-center">Quantité</div>
              <div className="text-center">Actions</div>
              <div className="text-right">Total</div>
            </div>

            <ul className="divide-y divide-gray-200">
              {carts.map((product) => (
                <li
                  key={product.id}
                  className="grid grid-cols-5 gap-4 px-4 py-4 items-center"
                >
                  <div className="font-bold truncate">{product.name}</div>

                  <div className="text-center">{product.price} €</div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors duration-300 hover:scale-105"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{product.quantity}</span>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors duration-300 hover:scale-105"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="px-3 py-1 text-red-500 hover:text-red-700 font-bold cursor-pointer transition-colors duration-300 hover:scale-105"
                    >
                      Supprimer
                    </button>
                  </div>

                  <div className="text-right font-bold">
                    {(product.price || 0) * (product.quantity || 1)} €
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center px-4">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold">{total} €</span>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Button
                  href="/"
                  text="Continuer les achats"
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-bold cursor-pointer transition-colors duration-300 hover:scale-105"
                />
                <Button
                  href="/paid"
                  text="Procéder au paiement"
                  className="px-6 py-2 bg-green-500 text-white hover:bg-green-600 rounded-md font-bold cursor-pointer transition-colors duration-300 hover:scale-105"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
