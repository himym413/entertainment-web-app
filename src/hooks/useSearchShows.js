import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchShows } from "../services/apiTMDB";

export function useSearchShows(query, page, showType) {
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ["search", query, Number(page), showType],
    queryFn: () => searchShows(query, Number(page), showType),
  });

  queryClient.prefetchQuery({
    queryKey: ["search", query, Number(page) + 1, showType],
    queryFn: () => searchShows(query, Number(page) + 1, showType),
  });

  return { isLoading, error, data };
}
