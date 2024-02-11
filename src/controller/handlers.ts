import { database } from '../database';
import { NewUserData } from 'utils/types';

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
