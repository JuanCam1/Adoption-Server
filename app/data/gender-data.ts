import { prisma } from "../lib/prisma";

export const dataGenderPet = async () => {
  const count = await prisma.genderPet.count();

  if (count === 0) {
    await prisma.genderPet.createMany({
      data: [
        {
          id: 1,
          gender: "Macho",
        },
        {
          id: 2,
          gender: "Hembra",
        },
      ],
    });
  }
};
