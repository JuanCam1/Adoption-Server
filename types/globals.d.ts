import type {
  LoginModel,
  PayloadModel,
  RegisterModel,
  RegisterMulterModel,
  ResponseLoginModel,
} from "./auth-model";
import type { PaginationAllModel } from "./pagination-model";
import type { PetModel, PetMulterModel, PetUpdateModel, PetUpdateMulterModel } from "./pet-model";
import type { SendResponseModel } from "./response-model";
import type { TokenDataModel, TokenPayloadModel } from "./token-model";
import type { UserModel, UserMulterModel } from "./user-model";

declare global {
  type SendResponseModelI<T> = SendResponseModel<T>;
  type PaginationAllModelI = PaginationAllModel;

  type LoginModelI = LoginModel;
  type RegisterModelI = RegisterModel;
  type RegisterMulterModelI = RegisterMulterModel;
  type PayloadModelI = PayloadModel;
  type ResponseLoginModelI = ResponseLoginModel;
  type TokenDataModelI = TokenDataModel;
  type TokenPayloadModelI = TokenPayloadModel;

  type UserModelI = UserModel;
  type UserMulterModelI = UserMulterModel;

  type PetModelI = PetModel;
  type PetMulterModelI = PetMulterModel;
  type PetUpdateModelI = PetUpdateModel;
  type PetUpdateMulterModelI = PetUpdateMulterModel;


}
