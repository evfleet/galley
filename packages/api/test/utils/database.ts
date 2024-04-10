import { createTables } from "@/database/utils/create-tables.js";

export async function setupDatabase() {
  createTables();
}
