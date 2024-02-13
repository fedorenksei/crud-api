import { IncomingMessage } from 'node:http';
import { getNewUserData, getUserId } from '../utils/validation';
import { database } from '../database';
import {
  InvalidUserIdError,
  NonExistentEndpointError,
  RequiredUserFieldsError,
} from '../utils/errors';
import { EndpointData } from '../utils/types';
import { addUser, deleteUser, getUser, getUsers, updateUser } from './handlers';

const endpoints: EndpointData[] = [
  {
    method: 'GET',
    arg: 'none',
    handler: getUsers,
  },
  {
    method: 'GET',
    arg: 'userId',
    handler: getUser,
  },
  {
    method: 'POST',
    arg: 'newUserData',
    newUserHandler: addUser,
  },
  {
    method: 'PUT',
    arg: 'both',
    updateUserHandler: updateUser,
  },
  {
    method: 'DELETE',
    arg: 'userId',
    handler: deleteUser,
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
      !!(endpointData.arg === 'userId' || endpointData.arg === 'both') ===
        !!userId,
  );
  if (!matchingEndpoints[0] || matchingEndpoints.length > 1)
    throw new NonExistentEndpointError();

  const endpoint = matchingEndpoints[0];

  if (endpoint.arg === 'newUserData' || endpoint.arg === 'both') {
    if (!newUserData) throw new RequiredUserFieldsError();
    if (endpoint.arg === 'newUserData')
      return () => endpoint.newUserHandler(newUserData);
  }

  if (userId && !database.validateUserId(userId))
    throw new InvalidUserIdError();

  if (endpoint.arg === 'both') {
    if (!userId) throw new NonExistentEndpointError();
    if (!newUserData) throw new RequiredUserFieldsError();
    return () => endpoint.updateUserHandler({ userId, data: newUserData });
  }

  if (endpoint.arg === 'userId') {
    if (!userId) throw new NonExistentEndpointError();
    return () => endpoint.handler(userId);
  }

  return () => endpoint.handler();
}
