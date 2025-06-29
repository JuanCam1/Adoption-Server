export interface TokenDataModel {
  id: number;
  name: string;
  email: string;
  picture: string;
}

export interface TokenPayloadModel {
  success: true;
  data: {
    exp: number;
    token: string;
    payload: TokenDataModel;
  };
}
