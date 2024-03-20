import { useQuery } from "@tanstack/react-query";

export function LandingPage() {
  const { data, error, status } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const response = await fetch("/api/collections");
      return response.json();
    },
  });

  console.log(data, error, status);

  return (
    <div>
      <h1>Landing</h1>
    </div>
  );
}
