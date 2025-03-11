import Banner from "./components/Banner";
import Card from "./components/Card";
import Category from "./components/Category";

export default function Home() {
  return (
    <main className=" bg-gradient-to-t from-[#666666] to-black">
      <Banner
        picture="/images/basketSport-1.webp"
        title="Chaussures de sport pour hommes"
      />
      <Category />
      <Card />
    </main>
  );
}
