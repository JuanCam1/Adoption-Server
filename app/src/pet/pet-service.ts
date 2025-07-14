import {
  createPetDao,
  deletePetDao,
  getByIdPetDao,
  listPetByIdUserDao,
  listPetDao,
  stateChangePetDao,
  updatePetDao,
} from "./pet-dao";

export const createPetService = async (petFile: PetModelI) => {
  return await createPetDao(petFile);
};

export const updatePetService = async (petFile: PetUpdateModelI) => {
  return await updatePetDao(petFile);
};

export const listPetService = async (query: PetListModelI) => {
  return await listPetDao(query);
};

export const listPetByIdUserService = async (query: PetListIdUserModelI) => {
  return await listPetByIdUserDao(query);
};

export const getByIdPetService = async (id: string) => {
  return await getByIdPetDao(id);
};

export const stateChangePetService = async (id: string) => {
  return await stateChangePetDao(id);
};

export const deletePetService = async (id: string) => {
  return await deletePetDao(id);
};
