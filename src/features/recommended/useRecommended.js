import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecommended } from "../../services/apiTMDB";
import { NUM_PAGES_INFINITE_SCROLL } from "../../utils/constants";

export function useRecommended() {
  // getting recommended shows
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isLoadingError,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["recommended"],
    queryFn: getRecommended,
    // max 200 results
    getNextPageParam: (lastPage) => {
      if (lastPage.pageParam >= NUM_PAGES_INFINITE_SCROLL) return undefined;

      return lastPage.pageParam + 1;
    },
  });

  const recommendedShows = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.finalData];
  }, []);

  return {
    recommendedShows,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isLoadingError,
    isFetchNextPageError,
  };
}
