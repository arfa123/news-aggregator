export class ApiError extends Error {
  constructor(message: any) {
    super(JSON.stringify(message));
    this.name = "ApiError";
  }
}
