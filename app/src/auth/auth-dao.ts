import type { User } from "../../../prisma/generated/prisma/client";
import { StateNumberValue, StateValue } from "../../conts/state-const";
import { InactiveUserError } from "../../error/inactive-user-error";
import { NotFoundError } from "../../error/not-found-error";
import { UnauthorizedError } from "../../error/un-authorized-error";
import { capitalizeText } from "../../lib/capitalize";
import { currentDate, currentDateAndHour } from "../../lib/current-date-hour";
import { prisma } from "../../lib/prisma";
import { generateRefreshToken, generateToken } from "../../lib/token";
import { comparePassword, hashPassword } from "../../util/hash-password";
import { randomOTP } from "../../util/random-otp";

export const loginDao = async (
  login: LoginModelI,
): Promise<ResponseLoginModelI> => {
  const userDb = await prisma.user.findUnique({
    include: {
      state: true,
    },
    where: {
      email: login.email,
    },
  });

  console.log("🟡 userDb", userDb);

  if (!userDb) throw new NotFoundError("Datos incorrectos");

  if (userDb.state.state === StateValue.INACTIVE || userDb.stateId === StateNumberValue.INACTIVE)
    throw new InactiveUserError("Usuario inactivo");

  const isPasswordValid = await comparePassword(
    login.password,
    userDb.password,
  );

  if (!isPasswordValid) throw new UnauthorizedError("Credenciales invalidas");

  const payloadData: PayloadModelI = {
    id: userDb.id,
    name: userDb.name,
    email: userDb.email,
    pathPicture: userDb.pathPicture,
  };

  const token = generateToken(payloadData);
  const refreshToken = generateRefreshToken(payloadData);

  await saveSession(userDb.id, token);
  await saveSession(userDb.id, refreshToken);

  return {
    id: userDb.id,
    name: userDb.name,
    email: userDb.email,
    token,
    refreshToken,
  };
};



export const registerDao = async (
  register: RegisterMulterModelI,
): Promise<Omit<User, "password" | "codeOTP">> => {
  const user = await prisma.user.findUnique({
    where: {
      email: register.email,
    },
  });

  if (user) throw new Error("User exist");

  if (!register.picture) throw new NotFoundError("File");

  const passwordHash = await hashPassword(register.password);
  const randomNumber = randomOTP(6);


  const { password: _, codeOTP: __, ...userCreate } = await prisma.user.create({
    data: {
      filenamePicture: register.picture.originalname,
      pathPicture: register.picture.filename,
      name: capitalizeText(register.name),
      email: register.email,
      password: passwordHash,
      phone: register.phone,
      address: capitalizeText(register.address),
      location: capitalizeText(register.location),
      stateId: StateNumberValue.INACTIVE,
      description: capitalizeText(register.description),
      codeOTP: randomNumber
    },
  });

  return userCreate;
};


const saveSession = async (userId: string, token: string) => {
  const { fecha, hora } = currentDateAndHour(currentDate());
  await prisma.session.create({
    data: {
      userId,
      type: "token",
      token,
      date_created: fecha,
      time_created: hora,
    },
  });
};