import { CustomError } from './custom-error';

export class ValidationError extends CustomError {
  constructor(public details: string[]) {
    super("Validation failed", 400);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
