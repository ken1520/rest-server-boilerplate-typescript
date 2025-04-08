import logger from "#config/logger.ts";
import { Users } from "#models/users.model.ts";
import type { UserDocument } from "#models/users.model.ts";
import { toUserDTO } from "#dto/users.dto.ts";
import type { UserDTO } from "#dto/users.dto.ts";

// Function to fetch all users
const index = async (): Promise<UserDTO[]> => {
  try {
    const users: UserDocument[] = await Users.find();
    logger.info(`Number of users fetched: ${users.length}`);

    return users.map(toUserDTO);
  } catch (error) {
    logger.error("Error fetching users:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};

export default {
  index,
};
