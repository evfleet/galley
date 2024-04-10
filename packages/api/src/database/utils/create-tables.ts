import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { db } from "../database.js";

export async function createTables() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const file = path.resolve(__dirname, "../schema.sql");
  const sql = fs.readFileSync(file, "utf-8");

  db.exec(sql);
}
