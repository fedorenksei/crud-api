import { NewUserData } from '../utils/types';
import { database } from '../database';
import { UserNotFoundError } from '../utils/errors';

export const getUsers = () => {
  return {
    code: 200,
    data: database.getAllUsers(),
  };
};

export const addUser = (newUserData: NewUserData) => {
  return {
    code: 200,
    data: database.createUser(newUserData),
  };
};

export const getUser = (userId: string) => {
  const user = database.getUser(userId);
  if (!user) throw new UserNotFoundError();
  return {
    code: 200,
    data: user,
  };
};

export const updateUser = ({
  userId,
  data,
}: {
  userId: string;
  data: NewUserData;
}) => {
  const user = database.updateUser({ id: userId, data });
  if (!user) throw new UserNotFoundError();
  return {
    code: 200,
    data: user,
  };
};

export const deleteUser = (userId: string) => {
  const user = database.deleteUser(userId);
  if (!user) throw new UserNotFoundError();
  return {
    code: 200,
    data: `User is successfully deleted. Id: ${userId}`,
  };
};
