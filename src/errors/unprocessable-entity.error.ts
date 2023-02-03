export class UnprocessableEntity extends Error {
  constructor(message: string) {
    super(JSON.stringify({ message, statusCode: 422 }));
  }
}
