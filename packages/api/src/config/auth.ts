import { pg } from "@lucia-auth/adapter-postgresql";
import { lucia } from "lucia";
import { express } from "lucia/middleware";

import { pool } from "./database.js";

export const auth = lucia({
  env: "DEV",
  adapter: pg(pool, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  middleware: express(),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
  debugMode: true,
  // issues with localhost
  // need local domain or enable during production
  csrfProtection: false,
});

export type Auth = typeof auth;
