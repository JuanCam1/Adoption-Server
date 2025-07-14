import type { GenderPet } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const listerGenderDao = async (): Promise<GenderPet[]> => {
	const genders = await prisma.genderPet.findMany();
	return genders;
};
