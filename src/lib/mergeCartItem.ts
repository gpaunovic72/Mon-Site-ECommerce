import prisma from "./prisma";

export async function mergeCartItems(userId: number, sessionId: string) {
  const sessionCartItems = await prisma.cart.findMany({
    where: {
      sessionId,
      userId: null,
    },
  });

  for (const item of sessionCartItems) {
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: item.productId,
        },
      },
    });

    if (existingCartItem) {
      await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + item.quantity },
      });
    } else {
      await prisma.cart.create({
        data: {
          userId,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
  }

  await prisma.cart.deleteMany({
    where: {
      sessionId,
      userId: null,
    },
  });
}
