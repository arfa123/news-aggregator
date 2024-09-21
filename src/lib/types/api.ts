/* eslint-disable no-unused-vars */
export class ApiError extends Error {
  constructor(message: any) {
    super(JSON.stringify(message));
    this.name = "ApiError";
  }
}

export type ErrorObject = {
  [key: string]: any;
};
