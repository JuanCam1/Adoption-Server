import { listerGenderDao } from "./gender-dao";

export const listGenderService = async () => {
  return await listerGenderDao();
};

