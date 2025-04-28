import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erreur 404",
  description: "Page non trouvée",
  robots: {
    index: false,
    follow: false,
  },
};
export default function Error() {
  return (
    <div className="flex flex-col align-center justify-center gap-3.5 text-center w-full h-screen">
      <h1 className="text-3xl font-bold">Erreur 404</h1>
      <p className="text-lg">
        Oups je crois que le produit n&apos;existe pas !
      </p>
    </div>
  );
}
