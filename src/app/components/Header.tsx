"use client";

import { useAdminRole } from "@/hooks/useAdminRole";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Header() {
  const { isAdmin } = useAdminRole();
  const { isLoggedIn, handleLogout } = useAuthStatus();
  const { cartItems } = useCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (cartItems) {
      const count = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    }
  }, [cartItems]);

  return (
    <header className="flex flex-col items-center gap-5 bg-gradient-to-t from-black to-[#666666] py-9 ">
      <div className="flex justify-center gap-28">
        <nav className="flex items-center gap-10 bg-white rounded-xl px-5 h-20">
          <Image
            src="/images/logo-amazon.svg"
            alt="Logo Amazon"
            width={72}
            height={72}
            style={{ width: "auto", height: "auto" }}
          />
          <Link href="/">Accueil</Link>
          <Link href="/#category">Catégories</Link>
          <Link href="/#items">Articles</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/cart" className="relative">
            <Image
              src="/images/icons/icon-panier.svg"
              alt="Panier"
              width={40}
              height={40}
              style={{ width: "auto", height: "auto" }}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
        <div className="flex items-center justify-center gap-5">
          {isLoggedIn ? (
            <Button
              href="/"
              onClick={handleLogout}
              text="Déconnexion"
              className="bg-[#F85F00] hover:bg-[#e04e00] text-white font-bold text-xl cursor-pointer hover:scale-105 transition-colors duration-300"
            />
          ) : (
            <Button
              href="/login"
              text="Connexion"
              className="bg-[#F85F00] hover:bg-[#e04e00] text-white font-bold text-xl cursor-pointer hover:scale-105 transition-colors duration-300"
            />
          )}
          {!isLoggedIn && (
            <Button
              href="/signup"
              text="Inscription"
              className="ml-5 bg-[#C50000] hover:bg-[#c50000b7] text-white font-bold text-xl cursor-pointer hover:scale-105 transition-colors duration-300"
            />
          )}
          {isAdmin && (
            <Button
              href="/addProducts"
              text="Ajouter un produit"
              className="bg-[#F85F00] hover:bg-[#e04e00] text-white font-bold text-xl cursor-pointer whitespace-nowrap hover:scale-105 transition-colors duration-300"
            />
          )}
        </div>
      </div>
    </header>
  );
}
