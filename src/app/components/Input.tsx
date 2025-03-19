"use client";
import { useState } from "react";

type InputProps = {
  onSearch: (search: string) => void;
};

export default function Input({ onSearch }: InputProps) {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="text-center m-5">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Rechercher un produit..."
        className="bg-gray-100 px-5 py-2.5 rounded-3xl text-center w-96"
      />
    </div>
  );
}
