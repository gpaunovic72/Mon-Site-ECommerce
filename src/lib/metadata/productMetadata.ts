import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { ProductMetadata } from "./types";

export async function generateProductMetadata(
  productId: number
): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return {
      title: "Produit non trouvé",
      description: "Le produit que vous recherchez n'existe pas.",
    };
  }

  const metadata: ProductMetadata = {
    title: `${product.name} | Mon Site E-Commerce`,
    description: `Découvrez le produit ${product.name} sur notre boutique en ligne.`,
    openGraph: {
      title: product.name,
      description: `Découvrez le produit ${product.name} sur notre boutique en ligne.`,
      images: [product.picture || ""],
      type: "product",
    },
  };

  return metadata;
}
