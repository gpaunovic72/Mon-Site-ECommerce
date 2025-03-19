import Image from "next/image";
import { categoryList } from "../datas/categoryList";

type CategoryProps = {
  onCategorySelected: (category: string) => void;
  selectedCategory: string | null;
};

export default function Category({
  onCategorySelected,
  selectedCategory,
}: CategoryProps) {
  return (
    <div id="category" className="bg-white py-8">
      <h2 className="text-black text-2xl font-bold text-center">Catégories</h2>
      <ul className="flex justify-center mt-8 space-x-6">
        {categoryList.map((category) => (
          <li key={category.id} className="cursor-pointer">
            <Image
              src={category.icon}
              alt={`Icon de ${category.categoryName}`}
              width={100}
              height={100}
              onClick={() => {
                if (category.categoryName === "Voir Tout") {
                  onCategorySelected("");
                } else {
                  onCategorySelected(
                    selectedCategory === category.categoryName
                      ? ""
                      : category.categoryName
                  );
                }
              }}
              className={
                selectedCategory === category.categoryName ||
                (category.categoryName === "Voir Tout" && !selectedCategory)
                  ? "border-2 border-[#F85F00]"
                  : ""
              }
            />
            <p className="text-center mt-2 text-sm">{category.categoryName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
