type Products = {
  id: number;
  name: string;
  price?: number;
  picture: string;
  description?: string;
};

export const productsList: Products[] = [
  {
    id: 1,
    name: "Chaussure de basketball pour homme",
    price: 110,
    picture: "/images/chaussure-de-basket-blanc.png",
  },
  {
    id: 2,
    name: "Apple iPhone 13 (128 Go) ",
    price: 800,
    picture: "/images/iphone13.png",
  },
  {
    id: 3,
    name: "Apple iPhone 14 (128 Go) - Bleu",
    price: 1200,
    picture: "/images/iphone-14.png",
  },
  {
    id: 4,
    name: "Chaussure de basketball pour homme",
    price: 110,
    picture: "/images/chaussure-de-basket-noir.png",
  },
  {
    id: 5,
    name: "Ballon de football",
    price: 50,
    picture: "/images/ballon-de-foot.png",
  },
  {
    id: 6,
    name: "Ballon de basket",
    price: 90,
    picture: "/images/ballon-de-basket.png",
  },
  {
    id: 7,
    name: "Nintendo Switch",
    price: 100,
    picture: "/images/nintendo-switch.png",
  },
  {
    id: 8,
    name: "Super Mario Party",
    price: 70,
    picture: "/images/super-mario-party.png",
  },
  {
    id: 9,
    name: "Switch",
    price: 150,
    picture: "/images/switch.png",
  },
  {
    id: 10,
    name: "Chaussure de CrossFit",
    price: 160,
    picture: "/images/chaussure-de-crossfit.png",
  },
];
