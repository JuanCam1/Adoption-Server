import { dataGenderPet } from "./gender-data";
import { dataState } from "./state-data";
import { dataTypePet } from "./type-data";

export const defaultData = async () => {
  await dataState();
  await dataGenderPet();
  await dataTypePet();
};
