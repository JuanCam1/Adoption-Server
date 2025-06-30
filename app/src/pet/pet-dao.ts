import path from "node:path";
import type { Pet } from "../../../prisma/generated/prisma/client";
import { PathConst } from "../../conts/path-const";
import { NotFoundError } from "../../error/not-found-error";
import { capitalizeText } from "../../lib/capitalize";
import { currentDate } from "../../lib/current-date-hour";
import { prisma } from "../../lib/prisma";
import { sharpFile } from "../../lib/sharp";
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

  const petCreated = await prisma.pet.create({
    data: {
      name: capitalizeText(petFile.name),
      genderId: Number(petFile.genderId),
      description: capitalizeText(petFile.description),
      breed: capitalizeText(petFile.breed),
      location: capitalizeText(petFile.location),
      latitude: Number(petFile.latitude),
      longitude: Number(petFile.longitude),
      typeId: Number(petFile.typeId),
      age: petFile.age,
      userId: petFile.userId,
      filenamePicture: petFile.picture.originalname,
      pathPicture: filename,
      createdAt: currentNow,
      updatedAt: currentNow,
    },
  });
  return petCreated;
};

export const updatePetDao = async (petFile: PetUpdateMulterModelI) => {
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
    },
  });

  return petUpdate;
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
