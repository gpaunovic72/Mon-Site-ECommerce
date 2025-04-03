"use client";

import { useAdminRole } from "@/hooks/useAdminRole";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function Header() {
  const { isAdmin } = useAdminRole();
  const { isLoggedIn, handleLogout } = useAuthStatus();

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
          <Link href="#">Contact</Link>
          <Link href="/cart">
            <Image
              src="/images/icons/icon-panier.svg"
              alt="Panier"
              width={40}
              height={40}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
        </nav>
        <div className="flex items-center justify-center gap-5">
          {isLoggedIn ? (
            <Button
              href="/"
              onClick={handleLogout}
              text="Déconnexion"
              className="bg-[#F85F00] hover:bg-[#e04e00] text-white font-bold text-xl cursor-pointer"
            />
          ) : (
            <Button
              href="/login"
              text="Connexion"
              className="bg-[#F85F00] hover:bg-[#e04e00] text-white font-bold text-xl cursor-pointer"
            />
          )}
          {!isLoggedIn && (
            <Button
              href="/signup"
              text="Inscription"
              className="ml-5 bg-[#C50000] hover:bg-[#c50000b7] text-white font-bold text-xl cursor-pointer"
            />
          )}
          {isAdmin && (
            <Button
              href="/addProducts"
              text="Ajouter un produit"
              className="bg-[#F85F00] hover:bg-[#e04e00] text-white font-bold text-xl cursor-pointer whitespace-nowrap"
            />
          )}
        </div>
      </div>
    </header>
  );
}
