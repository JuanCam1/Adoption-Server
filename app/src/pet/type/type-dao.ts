import type { TypePet } from "../../../../prisma/generated/prisma/client";
import { NotFoundError } from "../../../error/not-found-error";
import { prisma } from "../../../lib/prisma";

export const createTypeDao = async ({ type }: TypeCreatePetModelI): Promise<TypePet> => {

  const typeDb = await prisma.typePet.findUnique({
    where: {
      type,
    },
  });

  if (typeDb) throw new Error("Tipo de mascota ya existe");

  const typeCreated = await prisma.typePet.create({
    data: {
      type,
    },
  });

  return typeCreated;
};

export const updateTypeDao = async ({ id, type }: TypePetModelI): Promise<TypePet> => {
  const typeDb = await prisma.typePet.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!typeDb) throw new NotFoundError("Tipo de mascota no encontrado");

  const petUpdate = await prisma.typePet.update({
    data: {
      type,
    },
    where: {
      id: Number(id),
    }
  });

  return petUpdate;
};

export const listerTypeDao = async (): Promise<TypePet[]> => {
  const types = await prisma.typePet.findMany();
  return types;
};