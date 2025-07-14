import { loginDao, registerDao } from "./auth-dao";

export const loginService = async (login: LoginModelI) => {
  return await loginDao(login);
};

export const registerService = async (register: RegisterModelI) => {
  return await registerDao(register);
};
