import logger from "#config/logger.ts";
import { HttpException } from "#utils/http-exception.ts";

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

    interface Response {
      formattedJson: (payload: { data: any; status?: number }) => Response;
      formattedError: (error: Error | HttpException) => Response;
    }

    interface Locals {
      traceId: string;
    }
  }
}
