import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import server from "#root/server.ts";
import logger from "#config/logger.ts";

// Connect to database and start the server
mongoose
  .connect(`${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`)
  .then(() => {
    logger.info("Connected to database");

    server.listen(process.env.PORT, () => {
      logger.info(`Server listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => logger.error("Error connecting to database:", err));

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("Server shut down");
  process.exit(0);
});
