import type { User } from "../../../prisma/generated/prisma/client";
import { StateNumberValue, StateValue } from "../../conts/state-const";
import { NotFoundError } from "../../error/not-found-error";
import { capitalizeText } from "../../lib/capitalize";
import { currentDate } from "../../lib/current-date-hour";
import { prisma } from "../../lib/prisma";
import { deleteImage } from "../../util/delete-image";

export const updateUserDao = async (user: UserMulterModelI): Promise<Omit<User, "password" | "codeOTP">> => {
  const currentNow = currentDate();
  const userDb = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userDb) throw new NotFoundError("Datos incorrectos");

  let pathPicture = userDb.pathPicture;
  let filenamePicture = userDb.filenamePicture;

  if (user.picture) {

    deleteImage(user.picture.filename, "user");

    pathPicture = user.picture.filename;
    filenamePicture = user.picture.originalname;

  }

  const { password: _, ...userUpdate } = await prisma.user.update({
    data: {
      id: user.id,
      filenamePicture,
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
    }
  });

  return userUpdate;
};

export const stateAcountDao = async (id: string, type: StateValue): Promise<User> => {
  const currentNow = currentDate()
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
}
