import { useQuery } from "@tanstack/react-query";

async function fetchUser() {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    id: 1,
  };
}

export function useUser() {
  const { data, status } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return {
    status,
    user: data,
  };
}
