import { NewUserData, UserData } from 'utils/types';
import { v4 as uuidv4 } from 'uuid';

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
}

export const database = new UsersDatabase();
