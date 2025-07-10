export interface PetModel {
  name: string;
  description: string;
  location: string;
  typeId: number;
  genderId: number;
  age: string;
  breed: string;
  userId: string;
}

export interface PetMulterModel extends PetModel {
  picture: Express.Multer.File | undefined;
}

export interface PetUpdateModel extends PetModel {
  id: string;
}

export interface PetUpdateMulterModel extends PetUpdateModel {
  picture: Express.Multer.File | undefined;
}

export interface PetListModel {
  page: number;
  limit: number;
  typeId: number;
  genderId: number;
  state: string;
  location: string;
  age: string;
  breed: string;
  startDate: string;
  endDate: string;
}

export interface PetListIdUserModel {
  id: string;
  limit: number;
  page: number;
}
