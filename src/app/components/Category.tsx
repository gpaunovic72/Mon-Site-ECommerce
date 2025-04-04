"use client";

import { Category as CategoryType } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

type CategoryProps = {
  onCategorySelected: (category: string) => void;
  selectedCategory: string | null;
};

export default function Category({
  onCategorySelected,
  selectedCategory,
}: CategoryProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div id="category" className="bg-white py-8">
      <h2 className="text-black text-2xl font-bold text-center">Catégories</h2>
      <ul className="flex justify-center mt-8 space-x-6">
        {categories.map((category) => (
          <li key={category.id} className="cursor-pointer">
            <Image
              src={category.icon}
              alt={`Icon de ${category.name}`}
              width={100}
              height={100}
              style={{ width: "auto", height: "100px" }}
              onClick={() => {
                if (category.name === "Voir Tout") {
                  onCategorySelected("");
                } else {
                  onCategorySelected(
                    selectedCategory === category.name
                      ? ""
                      : category.id.toString()
                  );
                }
              }}
              className={
                selectedCategory === category.id.toString() ||
                (category.name === "Voir Tout" && !selectedCategory)
                  ? "border-2 border-[#F85F00]"
                  : ""
              }
            />
            <p className="text-center mt-2 text-sm">{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
