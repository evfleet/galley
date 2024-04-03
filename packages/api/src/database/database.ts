import Sqlite, { Database } from "better-sqlite3";

let db: Database;

if (process.env.NODE_ENV === "test") {
  db = new Sqlite(":memory:");
} else {
  db = new Sqlite("./src/database/galley.sqlite");
}

db.pragma("journal_mode = WAL");

export { db };
