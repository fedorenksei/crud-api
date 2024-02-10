import { usersPath } from './constants';

export class ApiError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export class InvalidUserIdError extends ApiError {
  constructor() {
    super('User ID is invalid', 400);
  }
}

export class UserNotFoundError extends ApiError {
  constructor() {
    super('User with this ID does not exist', 404);
  }
}

export class RequiredUserFieldsError extends ApiError {
  constructor() {
    super(
      'Request body does not contain required fields: username, age, hobbies',
      400,
    );
  }
}

export class NonExistentEndpointError extends ApiError {
  constructor() {
    super(
      `Endpoint does not exist. Available endpoints: ${usersPath} and ${usersPath}/{userId}`,
      404,
    );
  }
}

export class ServerError extends ApiError {
  constructor() {
    super("Server didn't manage to respond", 500);
  }
}
