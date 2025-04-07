import logger from "#config/logger.ts";
import Users, { UserDocument } from "#models/users.model.ts";

// Function to fetch all users
const index = async (): Promise<UserDocument[]> => {
  try {
    const users: UserDocument[] = await Users.find();
    logger.info(`Number of users fetched: ${users.length}`);
    return users;
  } catch (error) {
    logger.error("Error fetching users:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};

export default {
  index,
};
