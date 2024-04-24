import { useMutation } from "@tanstack/react-query";

import { Register } from "@galley/common";

async function register(user: Register) {
  const res = await fetch(`/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("An error registering new user");
  }

  return res.json();
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}
