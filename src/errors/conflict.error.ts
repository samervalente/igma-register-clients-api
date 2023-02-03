export class ConflictError extends Error {
  constructor(message: string) {
    super(JSON.stringify({ message, statusCode: 409 }));
  }
}
