import { useQuery } from "@tanstack/react-query";

async function fetchUser() {
  return {
    id: 123,
    username: "Soandso",
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
