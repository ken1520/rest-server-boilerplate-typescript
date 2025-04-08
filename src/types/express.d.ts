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
