import {
  createPetDao,
  listPetByIdUserDao,
  listPetDao,
  updatePetDao,
} from "./pet-dao";

export const createPetService = async (petFile: PetMulterModelI) => {
  return await createPetDao(petFile);
};

export const updatePetService = async (petFile: PetUpdateMulterModelI) => {
  return await updatePetDao(petFile);
};

export const listPetService = async (query: PetListModelI) => {
  return await listPetDao(query);
};

export const listPetByIdUserService = async (query: PetListIdUserModelI) => {
  return await listPetByIdUserDao(query);
};
