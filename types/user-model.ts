
export interface UserModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  description: string;
}

export interface UserMulterModel extends UserModel {
  picture: Express.Multer.File | undefined;
}