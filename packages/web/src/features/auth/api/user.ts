import { useQuery } from "@tanstack/react-query";

async function fetchUser() {
  return false;
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
