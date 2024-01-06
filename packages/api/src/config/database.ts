import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "database",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});
