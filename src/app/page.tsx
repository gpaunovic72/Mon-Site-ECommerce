import { fetchProducts } from "@/lib/api/products";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import Banner from "./components/Banner";
import FilterControls from "./components/FilterControls";

export const metadata: Metadata = {
  title: "Accueil | Mon Site E-Commerce",
  description:
    "Découvrez notre sélection de produits de qualité. Livraison rapide et paiement sécurisé.",
  openGraph: {
    title: "Mon Site E-Commerce - Votre boutique en ligne",
    description:
      "Découvrez notre sélection de produits de qualité. Livraison rapide et paiement sécurisé.",
    images: ["/images/basketSport-1.webp"],
    type: "website",
  },
};

export default async function Home() {
  const products: Product[] = await fetchProducts();

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-t from-[#666666] to-black">
      <Banner
        picture="/images/basketSport-1.webp"
        title="Chaussures de sport pour hommes"
        articleId="8"
      />
      <FilterControls initialProducts={products} />
    </main>
  );
}
