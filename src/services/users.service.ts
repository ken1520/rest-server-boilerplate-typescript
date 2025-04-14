import logger from "#config/logger.ts";
import { Users } from "#models/users.model.ts";
import type { UserDocument } from "#models/users.model.ts";
import { toUserDTO } from "#dto/users.dto.ts";
import type { UserDTO } from "#dto/users.dto.ts";
import type { ApiRequestQuery } from "#interfaces/request.ts";
import type { PaginatedResponse } from "#interfaces/response.ts";

// Function to fetch all users
const index = async (
  params: ApiRequestQuery,
): Promise<PaginatedResponse<UserDTO>> => {
  try {
    logger.info(`Parameters for fetching users: ${JSON.stringify(params)}`);

    const users: UserDocument[] = await Users.find()
      .limit(params.limit)
      .skip((params.page - 1) * params.limit);

    const total = await Users.countDocuments();

    logger.info(`Number of users fetched: ${users.length}`);

    const data = users.map(toUserDTO);

    return {
      meta: {
        page: params.page,
        limit: params.limit,
        total,
      },
      data,
    };
  } catch (error) {
    logger.error("Error fetching users:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};

export default {
  index,
};
