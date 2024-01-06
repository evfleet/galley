import "dotenv/config";

import { build } from "@/app.js";
import { logger } from "@/config/logger.js";

const start = async () => {
  const app = await build();
  const port = process.env.PORT || 8081;

  app.listen(port, () => {
    logger.info(`Server running on port: ${port}`);
  });
};

start();
