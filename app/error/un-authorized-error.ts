import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
