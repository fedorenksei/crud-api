type HandlerResult = {
  code: number;
  data: NonNullable<unknown>;
};

export type EndpointData =
  | {
      method: string;
      arg: 'none';
      handler: () => HandlerResult;
    }
  | {
      method: string;
      arg: 'userId';
      handler: (userId: string) => HandlerResult;
    }
  | {
      method: string;
      arg: 'newUserData';
      newUserHandler: (newUserData: NewUserData) => HandlerResult;
    }
  | {
      method: string;
      arg: 'both';
      updateUserHandler: (args: {
        userId: string;
        data: NewUserData;
      }) => HandlerResult;
    };

export type NewUserData = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type UserData = {
  id: string;
} & NewUserData;
