import { db } from "@/database/database.js";

type User = {
  id: number;
  email: string;
  hashedPassword: string;
};

type CreateUser = Omit<User, "id">;

function create(params: CreateUser): User {
  const sql = db.prepare("INSERT INTO users VALUES (@email, @hashedPassword)");
  const user = sql.get(params) as User;

  return user;
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
