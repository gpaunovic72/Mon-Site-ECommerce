import Image from "next/image";
import Button from "./Button";

type BannerProps = {
  title: string;
  picture: string;
  articleId: string;
};

export default function Banner({ title, picture, articleId }: BannerProps) {
  return (
    <div className="flex items-center justify-center gap-12 pb-2.5">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-white text-3xl">{title}</h1>
        <Button
          href={`/items/${articleId}`}
          text="Consulter"
          className="bg-white font-bold cursor-pointer hover:bg-gray-200 transition-colors duration-300 px-4 py-2 hover:scale-105"
        />
      </div>
      <Image src={picture} alt={title} width={500} height={500} />
    </div>
  );
}
