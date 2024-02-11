import { IncomingMessage } from 'node:http';
import { EndpointData, NewUserData } from 'utils/types';
import { usersPath } from '../utils/constants';
import {
  NonExistentEndpointError,
  RequiredUserFieldsError,
} from '../utils/errors';
import { addUser, getUsers } from './handlers';

const endpoints: EndpointData[] = [
  {
    method: 'GET',
    arg: 'none',
    handler: getUsers,
  },
  {
    method: 'POST',
    arg: 'newUserData',
    newUserHandler: addUser,
  },
];

export function parseRequest(
  { method: reqMethod, url }: IncomingMessage,
  body: string,
) {
  if (!reqMethod || !url) throw new NonExistentEndpointError();

  const userId = getUserId(url);
  const newUserData = getNewUserData(body);

  const matchingEndpoints = endpoints.filter(
    (endpointData) =>
      endpointData.method.toLowerCase() === reqMethod.toLowerCase() &&
      !!(endpointData.arg === 'userId') === !!userId,
  );
  if (!matchingEndpoints[0] || matchingEndpoints.length > 1)
    throw new NonExistentEndpointError();

  const endpoint = matchingEndpoints[0];
  if (endpoint.arg === 'newUserData') {
    if (!newUserData) throw new RequiredUserFieldsError();
    return () => endpoint.newUserHandler(newUserData);
  }
  return () => endpoint.handler(userId);
}

function getNewUserData(body: string): NewUserData | false {
  try {
    const data = JSON.parse(body);
    if (
      data instanceof Object &&
      typeof data.username === 'string' &&
      typeof data.age === 'number' &&
      Array.isArray(data.hobbies) &&
      data.hobbies.every((el: string) => typeof el === 'string')
    )
      return data;
    return false;
  } catch {
    return false;
  }
}

function getUserId(url: string) {
  const userIdMatch = url.match(new RegExp(`${usersPath}/([^/]+)`));
  return userIdMatch?.[1];
}
