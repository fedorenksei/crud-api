import { IncomingMessage, ServerResponse } from 'node:http';
import { respondOk, respondWithError } from '../utils/response';
import { parseRequest } from './endpoints';

type Args = {
  req: IncomingMessage;
  body: string;
  res: ServerResponse;
};

export function handleRequest({ req, body, res }: Args) {
  try {
    const operation = parseRequest(req, body);
    const result = operation();
    respondOk(res, result);
  } catch (error) {
    respondWithError(res, error);
  }
}
