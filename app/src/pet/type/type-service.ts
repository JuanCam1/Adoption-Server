import { createTypeDao, listerTypeDao, updateTypeDao } from "./type-dao";

export const createTypeService = async (type: TypeCreatePetModelI) => {
  return await createTypeDao(type);
};

export const updateTypeService = async (type: TypePetModelI) => {
  return await updateTypeDao(type);
};

export const listTypeService = async () => {
  return await listerTypeDao();
};