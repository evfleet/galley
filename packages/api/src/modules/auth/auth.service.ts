import { Register } from "@galley/common";

async function register({ email, password }: Register) {
  console.log("email", email);
  console.log("password", password);
}

export default {
  register,
};
