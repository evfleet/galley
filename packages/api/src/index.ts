import "dotenv/config";

import { build } from "@/app";

const start = async () => {
  const app = await build();
  const port = process.env.PORT || 8081;

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

start();
