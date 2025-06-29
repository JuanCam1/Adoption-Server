import type { Pet } from "../../../prisma/generated/prisma/client";
import { NotFoundError } from "../../error/not-found-error";
import { currentDate } from "../../lib/current-date-hour";
import { prisma } from "../../lib/prisma";
import { deleteImage } from "../../util/delete-image";

export const createPetDao = async (
  petFile: PetMulterModelI
): Promise<Pet> => {
  const currentNow = currentDate();
  const userDb = await prisma.user.findUnique({
    include: {
      state: true,
    },
    where: {
      id: petFile.userId,
    },
  });

  if (!userDb) throw new NotFoundError("Usuario no encontrado");

  if (!petFile.picture) throw new NotFoundError("Foto no encontrada");


  const petCreated = await prisma.pet.create({
    data: {
      name: petFile.name,
      genderId: petFile.genderId,
      description: petFile.description,
      breed: petFile.breed,
      location: petFile.location,
      latitude: petFile.latitude,
      longitude: petFile.longitude,
      typeId: petFile.typeId,
      age: petFile.age,
      userId: petFile.userId,
      filenamePicture: petFile.picture.originalname,
      pathPicture: petFile.picture.filename,
      createdAt: currentNow,
      updatedAt: currentNow,
    },
  })
  return petCreated;
};



export const updatePetDao = async (petFile: PetUpdateMulterModelI): Promise<Pet> => {
  const currentNow = currentDate();
  const userDb = await prisma.user.findUnique({
    include: {
      state: true,
    },
    where: {
      id: petFile.userId,
    },
  });

  if (!userDb) throw new NotFoundError("Usuario no encontrado");


  let pathPicture = userDb.pathPicture;
  let filenamePicture = userDb.filenamePicture;

  if (petFile.picture) {

    deleteImage(petFile.picture.filename, "pet");

    pathPicture = petFile.picture.filename;
    filenamePicture = petFile.picture.originalname;

  }

  const petUpdate = await prisma.pet.update({
    data: {
      name: petFile.name,
      genderId: petFile.genderId,
      description: petFile.description,
      breed: petFile.breed,
      location: petFile.location,
      latitude: petFile.latitude,
      longitude: petFile.longitude,
      typeId: petFile.typeId,
      age: petFile.age,
      userId: petFile.userId,
      filenamePicture,
      pathPicture,
      updatedAt: currentNow,
    },
    where: {
      id: petFile.id,
    }
  });

  return petUpdate;
};
