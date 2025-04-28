"use client";

import { useCart } from "@/hooks/useCart";
import { fetchDeleteCart, fetchUpdateCart } from "@/lib/api/cart";
import { Metadata } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export const metadata: Metadata = {
  title: "Panier | Mon Site E-Commerce",
  description: "Consultez votre panier d'achat.",
  robots: {
    index: false,
    follow: false,
  },
};

type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    picture: string;
  };
};

export default function Cart() {
  const { cartItems, isLoading, error } = useCart();
  const [carts, setCarts] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cartItems) {
      setCarts(cartItems);
    }
  }, [cartItems]);

  const removeFromCart = async (id: number) => {
    try {
      await fetchDeleteCart(id);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Erreur lors de la suppression du panier:", error);
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      if (newQuantity < 1) return;

      await fetchUpdateCart(productId, newQuantity);

      const updatedItems = cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCarts(updatedItems);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du panier:", error);
    }
  };

  const total = carts.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 1),
    0
  );

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-300 min-h-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-300 min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
              {carts.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-5 gap-4 px-4 py-4 items-center"
                >
                  <div>
                    <Image
                      src={item.product.picture}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="w-50 h-50 object-cover"
                    />
                  </div>

                  <div className="text-center">{item.product.price} €</div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors duration-300 hover:scale-105"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors duration-300 hover:scale-105"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="px-3 py-1 text-red-500 hover:text-red-700 font-bold cursor-pointer transition-colors duration-300 hover:scale-105"
                    >
                      Supprimer
                    </button>
                  </div>

                  <div className="text-right font-bold">
                    {(item.product.price || 0) * (item.quantity || 1)} €
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
