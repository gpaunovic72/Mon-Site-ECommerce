import Image from "next/image";
import { productsList } from "../datas/productsList";
import Button from "./Button";
export default function Card() {
  return (
    <div className="bg-white py-8 px-10 w-full flex flex-col justify-center">
      <h2 className="text-black text-2xl font-bold text-center">
        Nos produits
      </h2>
      <div className="mt-11 grid grid-cols-5 gap-8 p-5 text-center">
        {productsList.map((product) => (
          <div
            key={product.id}
            className="border border-[#C4C4C4] bg-[#CCCCCC] rounded-2xl flex flex-col align-center gap-2.5 w-full pb-4"
          >
            <Image
              src={product.picture}
              alt={`Photo de ${product.name}`}
              width={230}
              height={230}
              className="object-cover rounded-t-2xl w-full"
            />
            <h3 className="text-center text-black font-bold">{product.name}</h3>
            <p className="text-center text-black font-medium">
              {product.price} €
            </p>
            <Button
              href="#"
              text="Voir plus"
              className="bg-black text-white font-bold cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
