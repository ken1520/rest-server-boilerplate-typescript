import type { Request, Response, NextFunction } from "express";
import { HttpException } from "#utils/http-exception.ts";
import { formatResponse, formatError } from "#utils/response-formatter.ts";

export const responseFormatter = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Add formatted response methods to res object
    res.formattedJson = (payload) => formatResponse(res, payload);
    res.formattedError = (error: unknown) => formatError(res, error as Error);

    // Store traceId in response locals
    res.locals.traceId = req.traceId;
    next();
  };
};

export const errorHandler = () => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    formatError(res, err);
  };
};

export const notFoundHandler = () => {
  return (req: Request, res: Response) => {
    const error = new HttpException(
      404,
      "Resource not found",
      "RESOURCE_NOT_FOUND",
    );
    formatError(res, error);
  };
};
