import type { Request, Response } from "express";
import logger from "#config/logger.ts";
import UsersService from "#services/users.service.ts";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UsersService.index();

    res.json(users);
  } catch (error) {
    logger.error("Error fetching users:", error);
  }
};
