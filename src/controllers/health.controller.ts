import type { Request, Response } from "express";
import { formatResponse } from "#utils/response-formatter.ts";

const healthCheck = (req: Request, res: Response): void => {

  formatResponse(res, {
    data: { status: "ok" },
  })
};

export { healthCheck };
