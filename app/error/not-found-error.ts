import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  constructor(resource: string) {
    super(`${resource}`, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
