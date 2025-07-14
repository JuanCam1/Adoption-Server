import path from "node:path";
import type { Pet } from "../../../prisma/generated/prisma/client";
import { TypeStateNum } from "../../../types/pet-model";
import { PathConst } from "../../conts/path-const";
import { NotFoundError } from "../../error/not-found-error";
import { capitalizeText } from "../../lib/capitalize";
import { currentDate } from "../../lib/current-date-hour";
import { prisma } from "../../lib/prisma";
import { sharpFile } from "../../lib/sharp";
import { getLatitudAndLongitud } from "../../services/pet-services";
import { deleteImage } from "../../util/delete-image";

export const createPetDao = async (petFile: PetMulterModelI): Promise<Pet> => {
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

  const filename = `pet-${Date.now()}.jpeg`;
  const pathImage = path.join(
    process.cwd(),
    PathConst.destinationPet,
    filename,
  );

  await sharpFile(petFile.picture, pathImage);

  const dataLocation = await getLatitudAndLongitud(petFile.location);
  const locationData = dataLocation?.[0];

  const latitude = locationData ? Number(locationData.lat) : 0;
  const longitude = locationData ? Number(locationData.lon) : 0;

  const data: Omit<Pet, "id" | "statePet"> = {
    name: capitalizeText(petFile.name),
    genderId: Number(petFile.genderId),
    description: capitalizeText(petFile.description),
    breed: capitalizeText(petFile.breed),
    location: capitalizeText(petFile.location),
    latitude,
    longitude,
    typeId: Number(petFile.typeId),
    age: petFile.age,
    userId: petFile.userId,
    filenamePicture: petFile.picture.originalname,
    pathPicture: filename,
    createdAt: currentNow,
    updatedAt: currentNow,
    delete: false,
    stateId: 1,
  };

  console.log("data", data);
  const petCreated = await prisma.pet.create({
    data,
  });
  return petCreated;
};

export const updatePetDao = async (petFile: PetUpdateMulterModelI) => {
  console.log("petDap", petFile);

  const currentNow = currentDate();
  const userDb = await prisma.user.findUnique({
    where: {
      id: petFile.userId,
    },
  });

  if (!userDb) throw new NotFoundError("Usuario no encontrado");

  const petDb = await prisma.pet.findUnique({
    where: {
      id: petFile.id,
    },
  });

  if (!petDb) throw new NotFoundError("Mascota no encontrada");

  let pathPicture = petDb.pathPicture;
  let filenamePicture = petDb.filenamePicture;

  if (petFile.picture) {
    if (petDb.pathPicture) {
      deleteImage(petDb.pathPicture, "pet");
    }

    const filename = `pet-${Date.now()}.jpeg`;
    const pathImage = path.join(
      process.cwd(),
      PathConst.destinationPet,
      filename,
    );

    await sharpFile(petFile.picture, pathImage);
    pathPicture = filename;
    filenamePicture = petFile.picture.originalname;
  }

  let longitude = 0;
  let latitude = 0;

  if (capitalizeText(petFile.location) !== petDb.location) {
    const dataLocation = await getLatitudAndLongitud(petFile.location);
    console.log(dataLocation);
    const locationData = dataLocation?.[0];
    latitude = locationData ? Number(locationData.lat) : 0;
    longitude = locationData ? Number(locationData.lon) : 0;
  }

  console.log(longitude, latitude);
  const petUpdate = await prisma.pet.update({
    data: {
      name: capitalizeText(petFile.name),
      genderId: Number(petFile.genderId),
      description: capitalizeText(petFile.description),
      breed: capitalizeText(petFile.breed),
      location: capitalizeText(petFile.location),
      latitude: latitude,
      longitude: longitude,
      typeId: Number(petFile.typeId),
      age: petFile.age,
      userId: petFile.userId,
      filenamePicture,
      pathPicture,
      updatedAt: currentNow,
    },
    where: {
      id: petFile.id,
    },
  });

  return petUpdate;
};

export const listPetByIdUserDao = async (query: PetListIdUserModelI) => {
  const { id, limit = 10, page = 1 } = query;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const [pets, total] = await Promise.all([
    prisma.pet.findMany({
      where: {
        userId: id,
        delete: false,
      },
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
      include: {
        type: true,
        gender: true,
      },
    }),
    prisma.pet.count({
      where: {
        userId: id,
      },
    }),
  ]);

  return {
    pets,
    total,
    currentPage: pageNum,
    totalPages: Math.ceil(total / limitNum),
  };
};

export const listPetDao = async (query: PetListModelI) => {
  const {
    age,
    breed,
    endDate,
    genderId,
    location,
    limit = 10,
    page = 1,
    startDate,
    state,
    typeId,
  } = query;

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const filters: any = { delete: false };

  if (typeId) filters.typeId = Number(typeId);
  if (genderId) filters.genderId = Number(genderId);
  if (state) filters.state = state;
  if (location)
    filters.location = { contains: location as string, mode: "insensitive" };
  if (age) filters.age = { contains: age as string, mode: "insensitive" };
  if (breed) filters.breed = { contains: breed as string, mode: "insensitive" };

  if (startDate || endDate) {
    filters.createdAt = {};
    if (startDate) filters.createdAt.gte = new Date(startDate as string);
    if (endDate) filters.createdAt.lte = new Date(endDate as string);
  }

  const [pets, total] = await Promise.all([
    prisma.pet.findMany({
      where: filters,
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
      include: {
        type: true,
        gender: true,
        User: { select: { id: true, name: true, pathPicture: true } },
      },
    }),
    prisma.pet.count({ where: filters }),
  ]);

  return {
    pets,
    total,
    currentPage: pageNum,
    totalPages: Math.ceil(total / limitNum),
  };
};

export const getByIdPetDao = async (id: string) => {
  const pet = await prisma.pet.findFirst({
    where: {
      id,
      delete: false,
    },
    include: {
      type: true,
      gender: true,
      User: { select: { id: true, name: true, pathPicture: true } },
    },
  });

  if (!pet) throw new NotFoundError("Mascota no existe");
  return pet;
};

export const stateChangePetDao = async (id: string) => {
  const pet = await prisma.pet.findFirst({
    where: { id },
  });

  if (!pet) throw new NotFoundError("Mascota no existe");

  const stateId =
    pet.stateId === TypeStateNum.ACTIVE
      ? TypeStateNum.INACTIVE
      : TypeStateNum.ACTIVE;

  const petUpdate = await prisma.pet.update({
    data: {
      stateId,
    },
    where: {
      id,
    },
  });

  return petUpdate;
};

export const deletePetDao = async (id: string) => {
  const pet = await prisma.pet.findFirst({
    where: { id },
  });

  if (!pet) throw new NotFoundError("Mascota no existe");

  const petUpdate = await prisma.pet.update({
    data: {
      delete: true,
    },
    where: {
      id,
    },
  });

  return petUpdate;
};
