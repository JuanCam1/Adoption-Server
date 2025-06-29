import { prisma } from "../lib/prisma";

export const dataTypePet = async () => {
  const count = await prisma.typePet.count();

  if (count === 0) {
    await prisma.typePet.createMany({
      data: [
        {
          id: 1,
          type: "Perro",
        },
        {
          id: 2,
          type: "Gato",
        },
        {
          id: 3,
          type: "Hamster",
        },
        {
          id: 4,
          type: "Ave",
        },
      ],
    });
  }
};
