import { Argon2id } from "oslo/password";

import { auth } from "@/config/auth.js";
import { userRepository } from "@/modules/users/index.js";
import { Login, Register } from "@galley/common";

async function register({ email, password }: Register) {
  const hashedPassword = await new Argon2id().hash(password);
  const user = userRepository.create({ email, hashedPassword });

  const session = await auth.createSession(user.id, {});

  return {
    user,
    session,
  };
}

async function login({ email, password }: Login) {
  const user = userRepository.findByEmail(email);

  if (!user) {
    return null;
  }

  const validPassword = await new Argon2id().verify(
    user.hashedPassword,
    password,
  );

  if (!validPassword) {
    return null;
  }

  return await auth.createSession(user.id, {});
}

async function authenticate(sessionId: string) {
  // add logic to limit attempts etc
  const result = await auth.validateSession(sessionId);

  return result;
}

export default {
  register,
  login,
  authenticate,
};
