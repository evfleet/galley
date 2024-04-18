import { useQuery } from "@tanstack/react-query";

async function fetchUser() {
  const res = await fetch(`/api/v1/auth/`);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the user");
  }

  return res.json();
}

export function useUser() {
  const { data, status } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    status,
    user: data,
  };
}
