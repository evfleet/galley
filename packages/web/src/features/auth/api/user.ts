import { useQuery } from "@tanstack/react-query";

async function fetchUser() {
  const res = await fetch(`/api/v1/auth/`);

  if (res.status === 401) {
    return res.json();
  }

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
    staleTime: Infinity,
  });

  return {
    status,
    user: data,
  };
}
