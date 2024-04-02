import Sqlite from "better-sqlite3";

let db;

if (process.env.NODE_ENV === "test") {
  db = new Sqlite(":memory:");
} else {
  db = new Sqlite("galley.sqlite");
}

db.pragma("journal_mode = WAL");

export { db };
