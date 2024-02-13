import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { NewUserData, UserData } from '../utils/types';

class UsersDatabase {
  private UsersMap: Map<string, UserData>;
  constructor() {
    this.UsersMap = new Map();
  }

  public createUser({ username, age, hobbies }: NewUserData) {
    const id = uuidv4();
    const newUser = { id, username, age, hobbies };
    this.UsersMap.set(id, newUser);
    return newUser;
  }

  public getAllUsers() {
    return Array.from(this.UsersMap.values());
  }

  public getUser(id: string) {
    return this.UsersMap.get(id);
  }

  public deleteUser(id: string) {
    if (!this.UsersMap.has(id)) return false;
    this.UsersMap.delete(id);
    return true;
  }

  public updateUser({
    id,
    data: { username, age, hobbies },
  }: {
    id: string;
    data: NewUserData;
  }) {
    if (!this.UsersMap.has(id)) return false;
    const data = { id, username, age, hobbies };
    this.UsersMap.set(id, data);
    return data;
  }

  public validateUserId(id: string) {
    return validateUuid(id);
  }
}

export const database = new UsersDatabase();
