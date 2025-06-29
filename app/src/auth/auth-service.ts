import { loginDao, registerDao } from "./auth-dao";

export const loginService = async (login: LoginModelI) => {
  return await loginDao(login);
};

export const registerService = async (register: RegisterMulterModelI) => {
  return await registerDao(register);
};
