type HandlerResult = {
  code: number;
  data: NonNullable<unknown>;
};

export type EndpointData =
  | {
      method: string;
      arg: 'none' | 'userId';
      handler: (userId?: string) => HandlerResult;
    }
  | {
      method: string;
      arg: 'newUserData';
      newUserHandler: (newUserData: NewUserData) => HandlerResult;
    };

// export type RequestData = {
//   handler: RequestHandler;
//   userId?: string;
// };

export type NewUserData = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type UserData = {
  id: string;
} & NewUserData;
