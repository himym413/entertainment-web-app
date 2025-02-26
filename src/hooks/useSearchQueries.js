import { useLocation, useSearchParams } from "react-router-dom";

export function useSearchQueries() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  let page = searchParams.get("page");

  // at first, page is null, and is only set after pagination component is mounted
  if (!page) page = 1;

  let location = useLocation();
  let showType =
    location.pathname === "/" || location.pathname.slice(1) === "bookmarks"
      ? "multi"
      : location.pathname.slice(1) === "movies"
        ? "movie"
        : "tv";

  return {
    query,
    page,
    showType,
    bookmarksPage: location.pathname.slice(1) === "bookmarks",
  };
}
