import type { StateValue } from "../../conts/state-const";
import {
  stateAcountDao,
  updateUserDao
} from "./user-dao";

export const updateUserService = async (user: UserModelI) => {
  return await updateUserDao(user);
};

export const stateAccountService = async (id: string, type: StateValue) => {
  return await stateAcountDao(id, type);
};
