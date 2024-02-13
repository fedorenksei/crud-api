import { usersPath } from './constants';
import { NewUserData } from './types';

export const getNewUserData = (body: string): NewUserData | false => {
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
};

export const getUserId = (url: string) => {
  const userIdMatch = url.match(new RegExp(`${usersPath}/([^/]+)`));
  return userIdMatch?.[1];
};
