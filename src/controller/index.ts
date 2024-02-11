import { IncomingMessage, ServerResponse } from 'node:http';
import { respondWithError } from '../utils/response';
import { parseRequest } from './endpoints';

type Args = {
  req: IncomingMessage;
  body: string;
  res: ServerResponse;
};

export function handleRequest({ req, body, res }: Args) {
  try {
    const operation = parseRequest(req, body);
    const { code, data } = operation();
    res
      .writeHead(code, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(data));
  } catch (error) {
    respondWithError(res, error);
  }
}
