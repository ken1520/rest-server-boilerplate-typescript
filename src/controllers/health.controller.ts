import type { Request, Response } from "express";

const healthCheck = (req: Request, res: Response): void => {
  res.json({ status: "ok" });
};

export { healthCheck };
