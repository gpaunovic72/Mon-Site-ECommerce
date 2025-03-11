"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";

export default function Header() {
  const [search, setSearch] = useState<string>("");

  return (
    <header className="flex flex-col items-center gap-5 bg-gradient-to-t from-black to-[#666666] py-9 ">
      <div className="flex justify-center gap-28">
        <nav className="flex items-center gap-10 bg-white rounded-xl px-5 h-20">
          <Image
            src="/images/logo-amazon.svg"
            alt="Logo Amazon"
            width={72}
            height={72}
          />
          <Link href="/">Accueil</Link>
          <Link href="/category">Catégories</Link>
          <Link href="/items">Articles</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">
            <Image
              src="/images/icons/icon-panier.svg"
              alt="Panier"
              width={40}
              height={40}
            />
          </Link>
        </nav>
        <div className="flex items-center justify-center">
          <Button
            href="/login"
            text="Connexion"
            className="bg-[#F85F00] text-white font-bold text-xl cursor-pointer"
          />
          <Button
            href="/signup"
            text="Inscription"
            className="ml-5 bg-[#C50000] text-white font-bold text-xl cursor-pointer"
          />
        </div>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher un produit..."
        className="bg-gray-100 px-5 py-2.5 rounded-3xl text-center w-md"
      />
    </header>
  );
}
