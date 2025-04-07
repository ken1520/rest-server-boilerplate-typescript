export class HttpException extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
    public details?: string
  ) {
    super(message);
    this.code = code || `HTTP_${status}`;
    this.details = details || message;
  }
}
