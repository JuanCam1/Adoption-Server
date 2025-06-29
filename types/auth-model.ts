export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  location: string;
  description: string;
}

export interface RegisterMulterModel extends RegisterModel {
  picture: Express.Multer.File | undefined;
}

export interface PayloadModel {
  id: string;
  name: string;
  email: string;
}

export interface ResponseLoginModel {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}
