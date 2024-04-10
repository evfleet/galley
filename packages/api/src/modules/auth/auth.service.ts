import { Argon2id } from "oslo/password";

import { userRepository } from "@/modules/users/index.js";
import { Register } from "@galley/common";

async function register({ email, password }: Register) {
  const hashedPassword = await new Argon2id().hash(password);
  const user = userRepository.create({ email, hashedPassword });

  return {
    id: user.id,
    email: user.email,
  };
}

export default {
  register,
};
