/* eslint-disable no-unused-vars */
declare global {
  class ApiError extends Error {
    constructor(message: any);
  }

  type ErrorObject = {
    [key: string]: any;
  };
}

export {};
