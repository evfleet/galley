import { createTables } from "@/database/utils/create-tables.js";

beforeAll(() => {
  createTables();
});
