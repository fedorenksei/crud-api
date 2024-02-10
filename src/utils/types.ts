export type RequestHandler = (userId?: number) => NonNullable<unknown>;

export type RequestData = {
  handler: RequestHandler;
  userId?: string;
};
