"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { productsList } from "../datas/productsList";
import Button from "./Button";

type CardProps = {
  selectedCategory: string | null;
  search: string;
};

export default function Card({ selectedCategory, search }: CardProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("/api/auth/checkRole", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du rôle:", error);
      }
    };

    checkAdminRole();
  }, []);

  let filteredProducts = selectedCategory
    ? productsList.filter((product) => product.category === selectedCategory)
    : productsList;

  filteredProducts = search
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : filteredProducts;

  return (
    <div
      id="items"
      className="bg-white py-8 px-10 w-full flex flex-col justify-center"
    >
      <h2 className="text-black text-2xl font-bold text-center">
        Nos produits
      </h2>
      <div className="mt-11 grid grid-cols-5 gap-8 p-5 text-center">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-[#C4C4C4] bg-[#CCCCCC] rounded-2xl flex flex-col align-center gap-2.5 w-full pb-4"
          >
            <Image
              src={product.picture}
              alt={`Photo de ${product.name}`}
              width={230}
              height={230}
              style={{ width: "auto", height: "230px" }}
              className="object-cover rounded-t-2xl w-full"
            />
            <h3 className="text-center text-black font-bold">{product.name}</h3>
            <p className="text-center text-black font-medium">
              {product.price} €
            </p>
            <div className="flex flex-col gap-2">
              <Button
                href={`/items/${product.id}`}
                text="Voir plus"
                className="bg-black text-white font-bold cursor-pointer"
              />
              {isAdmin && (
                <div className="flex gap-2 justify-center">
                  <Button
                    href="#"
                    text="Modifier"
                    className="bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 transition-colors duration-300"
                  />
                  <Button
                    href="#"
                    text="Supprimer"
                    className="bg-red-500 text-white font-bold cursor-pointer hover:bg-red-600 transition-colors duration-300 "
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
