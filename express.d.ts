import { ApiResponse } from "./src/interfaces/response";
import { HttpException } from "./src/utils/http-exception";
import logger from "#config/logger.ts";

declare global {
  namespace Express {
    interface Request {
      traceId: string;
      logger: typeof logger;
      allParams: {
        query?: any;
        body?: any;
        params?: any;
      };
    }
  }
}
