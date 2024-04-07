import { db } from "@/database/database.js";

type CreateUser = {
  id: number;
  email: string;
  hashedPassword: string;
};

function create({ id, email, hashedPassword }: CreateUser) {
  const statement = db.prepare(
    // eslint-disable-next-line prettier/prettier
    "INSERT INTO users VALUES (@id, @email, @hashedPassword)"
  );

  statement.run(id, email, hashedPassword);
}

export default {
  create,
};
