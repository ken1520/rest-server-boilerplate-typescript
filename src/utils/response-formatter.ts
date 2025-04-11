import type { Response } from "express";
import type { ApiResponse } from "#interfaces/response.ts";
import { HttpException } from "#utils/http-exception.ts";

export const formatResponse = (
  res: Response,
  {
    data,
    status = 200,
  }: {
    data: any;
    status?: number;
  },
) => {
  const response: ApiResponse = {
    success: status >= 200 && status < 300,
    status,
    data,
    timestamp: new Date().toISOString(),
    traceId: res.locals.traceId,
  };

  return res.status(status).json(response);
};

export const formatError = (res: Response, error: Error | HttpException) => {
  const isProduction = process.env.NODE_ENV === "production";
  const status = error instanceof HttpException ? error.status : 500;
  const code =
    error instanceof HttpException ? error.code : "INTERNAL_SERVER_ERROR";

  const errorResponse: ApiResponse = {
    success: false,
    status,
    error: {
      code,
      details: error.message,
      stack: isProduction ? undefined : error.stack,
    },
    timestamp: new Date().toISOString(),
    traceId: res.locals.traceId,
  };

  return res.status(status).json(errorResponse);
};
