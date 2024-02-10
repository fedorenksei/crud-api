import { IncomingMessage, METHODS, ServerResponse } from 'node:http';
import { usersPath } from '../utils/constants';
import { NonExistentEndpointError } from '../utils/errors';
import { respondWithError } from '../utils/response';
import { getUsers } from './handlers/getUsers';
import { RequestData, RequestHandler } from 'utils/types';

const methodsMap: {
  method: (typeof METHODS)[number];
  withId: boolean;
  handler: RequestHandler;
}[] = [
  {
    method: 'GET',
    withId: false,
    handler: getUsers,
  },
];

export function handle(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;
  try {
    parseRequest(method, url);
  } catch (error) {
    respondWithError(res, error);
    return;
  }
  const str = `Received ${method} request for ${url}`;
  res.writeHead(200, { 'Content-Type': 'text/plain' }).end(str);
}

function parseRequest(
  reqMethod: string | undefined,
  url: string | undefined,
): void | RequestData {
  if (!reqMethod || !url) throw new NonExistentEndpointError();
  const userIdMatch = url.match(new RegExp(`${usersPath}/([^/]+)`));
  const userId = userIdMatch?.[1];

  const matchingEndpoints = methodsMap.filter(({ method, withId }) => {
    if (method.toLowerCase() !== reqMethod.toLowerCase()) return false;
    if (!!withId !== !!userId) return false;
    return true;
  });
  if (!matchingEndpoints[0]) throw new NonExistentEndpointError();

  return { handler: matchingEndpoints[0].handler, userId };
}
