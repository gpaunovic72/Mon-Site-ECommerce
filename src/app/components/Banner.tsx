import Image from "next/image";
import Button from "./Button";

type BannerProps = {
  title: string;
  picture: string;
};

export default function Banner({ title, picture }: BannerProps) {
  return (
    <div className="flex items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-12 ">
        <h1 className="text-white text-3xl">{title}</h1>
        <Button
          href="#"
          text="Consulter"
          className="bg-white font-bold cursor-pointer "
        />
      </div>
      <Image src={picture} alt={title} width={500} height={500} />
    </div>
  );
}
