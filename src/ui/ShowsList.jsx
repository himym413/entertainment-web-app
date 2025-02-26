import { useSearchQueries } from "../hooks/useSearchQueries";
import { useShows } from "../hooks/useShows";

import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import ShowsListStyled from "../ui/ShowsListStyled";
import ShowItem from "../ui/ShowItem";
import Error from "../ui/Error";
import AmazonPagination from "./Pagination";

function ShowsList() {
  // Get search params
  let { query, page, showType, bookmarksPage } = useSearchQueries();

  // Get data, loading state, and error
  const { isFetching, data, error } = useShows(
    Number(page),
    showType,
    query,
    bookmarksPage,
  );

  let totalPages = data?.total_pages;

  if (isFetching) return <Spinner />;

  if (!data.results || !data.results.length)
    return (
      <p className="text-center">
        {bookmarksPage
          ? "Go ahead and bookmark some shows. They will be shown here."
          : "No available shows at the moment. Please try again later."}
      </p>
    );

  if (error) return <Error message={error.message} />;

  return (
    <>
      <Heading
        text={
          query
            ? `Found ${data.total_results} results for '${query}'`
            : `${bookmarksPage ? "Bookmarks" : showType === "movie" ? "Movies" : "TV Series"}`
        }
      />
      <ShowsListStyled>
        {data?.results.map((show) => (
          <ShowItem key={show.id} show={show} recommended />
        ))}
      </ShowsListStyled>
      {totalPages > 1 && (
        <AmazonPagination totalPages={totalPages > 500 ? 500 : totalPages} />
      )}
    </>
  );
}

export default ShowsList;
