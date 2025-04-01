"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("login", handleLogin);

    return () => window.removeEventListener("login", handleLogin);
  }, []);

  return (
    <header className="flex flex-col items-center gap-5 bg-gradient-to-t from-black to-[#666666] py-9 ">
      <div className="flex justify-center gap-28">
        <nav className="flex items-center gap-10 bg-white rounded-xl px-5 h-20">
          <Image
            src="/images/logo-amazon.svg"
            alt="Logo Amazon"
            width={72}
            height={72}
            style={{ width: "auto", height: "72px" }}
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
            />
          </Link>
        </nav>
        <div className="flex items-center justify-center gap-5">
          {isLoggedIn ? (
            <Button
              href="/"
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}
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
              className="bg-[#F85F00] hover:bg-[#e04e00] text-white font-bold text-xl cursor-pointer"
            />
          )}
        </div>
      </div>
    </header>
  );
}
