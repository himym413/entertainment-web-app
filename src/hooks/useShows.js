import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchShows, getShows } from "../services/apiTMDB";
import { getBookmarks } from "../services/apiProfiles";
import { useEffect } from "react";
import { useUser } from "../features/auth/useUser";

export function useShows(page, showType, query = "", bookmarksPage) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const fetchShows = bookmarksPage
    ? () => getBookmarks(Number(page), query, user?.id)
    : query
      ? () => searchShows(query, Number(page), showType)
      : () => getShows(Number(page), showType);

  const queryKey = bookmarksPage
    ? [Number(page), "bookmarks", query]
    : query
      ? ["search", query, Number(page), showType]
      : [Number(page), showType];

  const { isFetching, data, error } = useQuery({
    queryKey,
    queryFn: fetchShows,
  });

  // Prefetch the next page
  const nextPageQueryKey = bookmarksPage
    ? [Number(page) + 1, "bookmarks", query]
    : query
      ? ["search", query, Number(page) + 1, showType]
      : [Number(page) + 1, showType];

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: nextPageQueryKey,
      queryFn: bookmarksPage
        ? () => getBookmarks(Number(page) + 1, query, user?.id)
        : query
          ? () => searchShows(query, Number(page) + 1, showType)
          : () => getShows(Number(page) + 1, showType),
    });
  }, [page]);

  return {
    isFetching,
    data,
    error,
  };
}
