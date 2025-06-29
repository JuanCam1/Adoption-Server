import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
