import prisma from "@/lib/prisma";

const categoryList = [
  {
    icon: "/images/icons/icon-infini.svg",
    name: "Voir Tout",
  },
  {
    icon: "/images/icons/icon-chaussures.svg",
    name: "Chaussures",
  },
  { icon: "/images/icons/icon-sport.svg", name: "Sport" },
  {
    icon: "/images/icons/icon-jeuxVideo.svg",
    name: "Jeux-Vidéos",
  },
  {
    icon: "/images/icons/icon-electromenager.svg",
    name: "Electroniques",
  },
];

async function main() {
  for (const category of categoryList) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
}

main()
  .catch((e) => {
    console.error("Error seeding the database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
