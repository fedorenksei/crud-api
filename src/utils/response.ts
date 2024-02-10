import { ServerResponse } from 'node:http';
import { ApiError } from './errors';

export function respondWithError(res: ServerResponse, error: unknown) {
  let code: number, message: string;
  if (error instanceof ApiError) {
    ({ code, message } = error);
  } else {
    code = 500;
    message = 'Oops! Sorry, unknown error occured';
  }
  res.writeHead(code, { 'Content-Type': 'text/plain' }).end(message);
}
