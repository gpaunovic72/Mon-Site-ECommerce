import { fetchProducts } from "@/lib/api/products";
import { Product } from "@prisma/client";
import Banner from "./components/Banner";
import FilterControls from "./components/FilterControls";

export default async function Home() {
  const products: Product[] = await fetchProducts();

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-t from-[#666666] to-black">
      <Banner
        picture="/images/basketSport-1.webp"
        title="Chaussures de sport pour hommes"
      />
      <FilterControls initialProducts={products} />
    </main>
  );
}
