import type { Request, Response } from "express";
import logger from "#config/logger.ts";
import UsersService from "#services/users.service.ts";
import type { ApiRequestQuery } from "#interfaces/request.ts";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryString: ApiRequestQuery = {
      limit: Number(req.query.limit) || 10,
      page: Number(req.query.page) || 1,
    };

    const { data, meta } = await UsersService.index(queryString);

    res.formattedJson({
      data,
      meta: {
        limit: queryString.limit,
        page: queryString.page,
        total: meta.total,
      },
    });
  } catch (error) {
    logger.error("Error fetching users:", error);
    res.formattedError(error);
  }
};
