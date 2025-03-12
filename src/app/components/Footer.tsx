import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#666666] to-black ">
      <div className="w-[90%] mt-2.5 mx-10 grid grid-cols-4 text-center">
        <div className="flex flex-col gap-1.5 py-5 px-10">
          <h2 className="text-xl text-white font-bold">Contacts</h2>
          <div className="flex gap-7 py-4 px-5">
            <Image
              src="/images/icons/icon-adresse.svg"
              alt="Icon adresse"
              width={40}
              height={40}
            />
            <p className="text-white text-lg font-light w-[64%] text-start my-4">
              83, rue Pierre Motte, 97400 Saint-Denis
            </p>
          </div>
          <div className="flex gap-7 py-4 px-5">
            <Image
              src="/images/icons/icon-telephone.svg"
              alt="Icon téléphone"
              width={40}
              height={40}
            />
            <p className="text-white text-lg font-light w-[64%] text-start my-4">
              01 44 80 55 68
            </p>
          </div>
          <div className="flex gap-7 py-4 px-5">
            <Image
              src="/images/icons/icon-email.svg"
              alt="Icon email"
              width={40}
              height={40}
            />
            <p className="text-white text-lg font-light w-[64%] text-start my-4">
              aeled1969@gmail.com
            </p>
          </div>
          <div className="flex justify-between w-[85%]">
            <Link href="https://www.twitter.com">
              <Image
                src="/images/icons/icon-twitter.svg"
                alt="Icon Twitter"
                width={50}
                height={41}
                className="cursor-pointer"
              />
            </Link>
            <Link href="https://www.instagram.com/">
              <Image
                src="/images/icons/icon-instagram.svg"
                alt="Icon instagram"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </Link>
            <Link href="https://www.facebook.com/">
              <Image
                src="/images/icons/icon-facebook.svg"
                alt="Icon facebook"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-5 px-10">
          <h2 className="text-xl text-white font-bold">Mon compte</h2>
          <Link href="#">
            <p className="text-white">Inscription</p>
          </Link>
          <Link href="#">
            <p className="text-white">Connexion</p>
          </Link>
          <Link href="#">
            <p className="text-white">Mon panier</p>
          </Link>
          <Link href="#">
            <p className="text-white">Aide</p>
          </Link>
        </div>
        <div className="flex flex-col gap-8 py-5 px-10">
          <h2 className="text-xl text-white font-bold">Information</h2>
          <Link href="#">
            <p className="text-white">Informations de livraison</p>
          </Link>
          <Link href="#">
            <p className="text-white">Politique de confidentialité</p>
          </Link>
          <Link href="#">
            <p className="text-white">Termes et conditions</p>
          </Link>
          <Link href="#">
            <p className="text-white">Contactez-nous</p>
          </Link>
        </div>
        <div className="flex flex-col gap-8 py-5 px-10">
          <h2 className="text-xl text-white font-bold">Service client</h2>
          <Link href="#">
            <p className="text-white">Expéditions et retours</p>
          </Link>
          <Link href="#">
            <p className="text-white">Achats sécurisés</p>
          </Link>
          <Link href="#">
            <p className="text-white">Expédition internationale</p>
          </Link>
          <Link href="#">
            <p className="text-white">Contact</p>
          </Link>
        </div>
      </div>
      <div className="mt-5 h-14 flex flex-col gap-2.5">
        <p className="border-2 text-white ml-[120px] mr-[120px]" />
        <p className="text-gray-400 text-lg font-light text-center h-10">
          &copy; 2025 Mon Site E-Commerce. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
