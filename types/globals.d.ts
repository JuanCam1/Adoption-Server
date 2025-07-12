import type {
  LoginModel,
  PayloadModel,
  RegisterModel,
  RegisterMulterModel,
  ResponseLoginModel,
} from "./auth-model";
import type { PaginationAllModel } from "./pagination-model";
import type {
  PetListModel,
  PetModel,
  PetMulterModel,
  PetUpdateModel,
  PetUpdateMulterModel,
  StatePetAdoption,
  TypeStateNum,
  TypeStateValue,
} from "./pet-model";
import type { SendResponseModel } from "./response-model";
import type { LatitudLongitudModel } from "./services-model";
import type { TokenDataModel, TokenPayloadModel } from "./token-model";
import type { TypeCreatePetModel, TypePetModel } from "./type-pet-model";
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

  type TypePetModelI = TypePetModel;
  type TypeCreatePetModelI = TypeCreatePetModel;
  type PetListModelI = PetListModel;
  type PetListIdUserModelI = PetListIdUserModel;
  type StatePetAdoptionI = StatePetAdoption;
  type TypeStateNumI = TypeStateNum;
  type TypeStateValueI = TypeStateValue;

  type LatitudLongitudModelI = LatitudLongitudModel;
}
