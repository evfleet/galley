import { Argon2id } from "oslo/password";

import { auth } from "@/config/auth.js";
import { userRepository } from "@/modules/users/index.js";
import { Register } from "@galley/common";

async function register({ email, password }: Register) {
  const hashedPassword = await new Argon2id().hash(password);
  const user = userRepository.create({ email, hashedPassword });

  const session = await auth.createSession(user.id, {});

  return {
    user,
    session,
  };
}

export default {
  register,
};
