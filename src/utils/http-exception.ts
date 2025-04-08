export class HttpException extends Error {
  public status: number;
  public code: string;
  public details: string;

  constructor(
    status: number,
    message: string,
    code?: string,
    details?: string,
  ) {
    super(message);
    this.status = status;
    this.code = code || `HTTP_${status}`;
    this.details = details || message;
  }
}
