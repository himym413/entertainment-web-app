import { useQuery } from "@tanstack/react-query";
import { getTrending } from "../../services/apiTMDB";

// custom hook that returns 5 trending movies and tv series
export function useTrending() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  return { isLoading, data, isError };
}
