import { prisma } from "../lib/prisma";

export const dataState = async () => {
  const count = await prisma.state.count();

  if (count === 0) {
    await prisma.state.createMany({
      data: [
        {
          id: 1,
          state: "Active",
        },
        {
          id: 2,
          state: "Inactive",
        },
      ],
    });
  }
};
