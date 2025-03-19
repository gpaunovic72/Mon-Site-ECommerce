"use client";
import { useState } from "react";
import Banner from "./components/Banner";
import Card from "./components/Card";
import Category from "./components/Category";
import Input from "./components/Input";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const handleCategorySelected = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-t from-[#666666] to-black">
      <Input onSearch={setSearch} />
      <Banner
        picture="/images/basketSport-1.webp"
        title="Chaussures de sport pour hommes"
      />
      <Category
        onCategorySelected={handleCategorySelected}
        selectedCategory={selectedCategory}
      />
      <Card selectedCategory={selectedCategory} search={search} />
    </main>
  );
}
