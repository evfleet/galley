import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { MainLayout } from "@/components/MainLayout";

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
    <MainLayout>
      <h1>Landing</h1>
      <p>You have no recipes</p>
      <Link to="/recipes/create">Create a recipe</Link>
    </MainLayout>
  );
}
