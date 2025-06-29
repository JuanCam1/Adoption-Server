import { createPetDao, updatePetDao } from "./pet-dao";

export const createPetService = async (petFile: PetMulterModelI) => {
  return await createPetDao(petFile);
};

export const updatePetService = async (petFile: PetUpdateMulterModelI) => {
  return await updatePetDao(petFile);
};
