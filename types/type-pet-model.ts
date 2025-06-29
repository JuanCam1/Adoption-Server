export interface TypePetModel {
  id: string;
  type: string;
}

export type TypeCreatePetModel = Pick<TypePetModel, "type">;