export type Category = {
  id: number;
  icon: string;
  categoryName: string;
};

export const categoryList: Category[] = [
  {
    id: 1,
    icon: "/images/icons/icon-infini.svg",
    categoryName: "Voir Tout",
  },
  {
    id: 2,
    icon: "/images/icons/icon-chaussures.svg",
    categoryName: "Chaussures",
  },
  { id: 3, icon: "/images/icons/icon-sport.svg", categoryName: "Sport" },
  {
    id: 4,
    icon: "/images/icons/icon-jeuxVideo.svg",
    categoryName: "Jeux-Vidéos",
  },
  {
    id: 5,
    icon: "/images/icons/icon-electromenager.svg",
    categoryName: "Electroniques",
  },
];
