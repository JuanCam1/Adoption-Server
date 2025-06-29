import { CustomError } from "./custom-error";

export class InactiveUserError extends CustomError {
  constructor(message = "El usuario está inactivo") {
    super(message, 403);
    Object.setPrototypeOf(this, InactiveUserError.prototype);
  }
}
