type stateType = "success" | "error";

export interface SendResponseModel<T> {
  exito: stateType;
  estado: number;
  mensaje: string;
  data: T;
}
