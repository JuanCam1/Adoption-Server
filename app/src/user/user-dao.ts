import path from "node:path";
import type { User } from "../../../prisma/generated/prisma/client";
import { PathConst } from "../../conts/path-const";
import { StateNumberValue, StateValue } from "../../conts/state-const";
import { NotFoundError } from "../../error/not-found-error";
import { capitalizeText } from "../../lib/capitalize";
import { currentDate } from "../../lib/current-date-hour";
import { prisma } from "../../lib/prisma";
import { sharpFile } from "../../lib/sharp";
import { deleteImage } from "../../util/delete-image";

export const updateUserDao = async (
  user: UserModelI,
): Promise<Omit<User, "password" | "codeOTP">> => {
  const currentNow = currentDate();
  const userDb = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userDb) throw new NotFoundError("Datos incorrectos");

  let pathPicture = userDb.pathPicture;


  if (user.picture && typeof user.picture === "string") {
    if (userDb.pathPicture) {
      deleteImage(userDb.pathPicture, "user");
    }

    const filename = `user-${Date.now()}.jpeg`;
    const pathImage = path.join(process.cwd(), PathConst.destinationUser, filename);

    const imageBuffer = Buffer.from(user.picture, "base64");

    await sharpFile(imageBuffer, pathImage);

    pathPicture = filename;
  }

  const { password: _, ...userUpdate } = await prisma.user.update({
    data: {
      id: user.id,
      pathPicture,
      name: capitalizeText(user.name),
      email: user.email,
      phone: user.phone,
      address: capitalizeText(user.address),
      location: capitalizeText(user.location),
      description: capitalizeText(user.description),
      updatedAt: currentNow,
    },
    where: {
      id: user.id,
    },
  });

  return userUpdate;
};

export const stateAcountDao = async (
  id: string,
  type: StateValue,
): Promise<User> => {
  const currentNow = currentDate();
  let user: User;
  if (type === StateValue.ACTIVE) {
    user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stateId: StateNumberValue.ACTIVE,
        updatedAt: currentNow,
      },
    });
  } else {
    user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stateId: StateNumberValue.INACTIVE,
        updatedAt: currentNow,
      },
    });
  }
  return user;
};
