import { ServerResponse } from 'node:http';
import { ApiError } from './errors';
import { HandlerResult } from './types';

export const respondWithError = (res: ServerResponse, error: unknown) => {
  let code: number, message: string;
  if (error instanceof ApiError) {
    ({ code, message } = error);
  } else {
    code = 500;
    message = 'Oops! Sorry, unknown error occured';
  }
  res.writeHead(code, { 'Content-Type': 'text/plain' }).end(message);
};

export const respondOk = (
  res: ServerResponse,
  { code, data }: HandlerResult,
) => {
  res
    .writeHead(code, { 'Content-Type': 'application/json' })
    .end(JSON.stringify(data));
};
