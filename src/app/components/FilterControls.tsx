"use client";

import { Product } from "@prisma/client";
import { useState } from "react";
import Card from "./Card";
import Category from "./Category";
import Input from "./Input";

type FilterControlsProps = {
  initialProducts: Product[];
};

export default function FilterControls({
  initialProducts,
}: FilterControlsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const handleCategorySelected = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div>
      <Input onSearch={setSearch} />
      <Category
        onCategorySelected={handleCategorySelected}
        selectedCategory={selectedCategory}
      />
      <Card
        products={initialProducts}
        selectedCategory={selectedCategory}
        search={search}
      />
    </div>
  );
}
