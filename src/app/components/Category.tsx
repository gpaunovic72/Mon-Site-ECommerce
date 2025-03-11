import Image from "next/image";
import { categoryList } from "../datas/categoryList";

export default function Category() {
  return (
    <div className="bg-white py-8">
      <h2 className="text-black text-2xl font-bold text-center">Catégories</h2>
      <ul className="flex justify-center mt-8">
        {categoryList.map((category) => (
          <li key={category.id}>
            <Image
              src={category.icon}
              alt="Icon de catégories"
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
