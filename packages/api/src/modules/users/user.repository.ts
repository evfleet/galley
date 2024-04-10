import { db } from "@/database/database.js";

type User = {
  id: number;
  email: string;
  hashedPassword: string;
};

type CreateUser = Omit<User, "id">;

function create({ email, hashedPassword }: CreateUser): User {
  const sql = db.prepare(
    "INSERT INTO users VALUES (@id, @email, @hashedPassword)",
  );
  const result = sql.run({ id: null, email, hashedPassword });
  const id = result.lastInsertRowid as number;

  return {
    id,
    email,
    hashedPassword,
  };
}

function findByEmail(email: string) {
  const sql = db.prepare("SELECT * FROM users WHERE email = @email");
  const user = sql.get({ email }) as User;

  return user;
}

export default {
  create,
  findByEmail,
};
