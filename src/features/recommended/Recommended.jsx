import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecommended } from "./useRecommended";
import { LOCAL_STORAGE_SCROLL_Y_KEY } from "../../utils/constants";

import ShowItem from "../../ui/ShowItem";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import ShowsListStyled from "../../ui/ShowsListStyled";
import Error from "../../ui/Error";

function Recommended() {
  // USE INFINITE QUERY TO GET AND STORE DATA IN CACHE
  const {
    recommendedShows,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isLoadingError,
    isFetchNextPageError,
  } = useRecommended();

  // only saves scroll position if we go to show details page
  function handleClick(e) {
    if (e.target.closest(".show-item")) {
      localStorage.setItem(
        LOCAL_STORAGE_SCROLL_Y_KEY,
        window.scrollY || window.pageYOffset,
      );
    } else if (localStorage.getItem(LOCAL_STORAGE_SCROLL_Y_KEY))
      localStorage.removeItem(LOCAL_STORAGE_SCROLL_Y_KEY);
  }

  // this useEffect listens for click event in order to save scrollY position
  // on every mount of recommended component, we check if scroll position is saved in localStorage (it is only save if we are coming back from show details page as it can be seen in showDetails component)
  useEffect(function () {
    window.addEventListener("click", handleClick);

    // if it's saved, scroll to that position
    const scrollYPosition = localStorage.getItem(LOCAL_STORAGE_SCROLL_Y_KEY);
    if (scrollYPosition) window.scrollTo(0, scrollYPosition);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (isLoading) return <Spinner />;

  // this error handles only initial data
  // if there is a (inital) loading error, just show error component instead of shows list and infinite scroll components
  if (isLoadingError)
    return (
      <>
        <Heading text="Recommended for you" />
        <Error message="We are unable to get recommended shows at the moment. Please try again later or contact us if the problem persists." />
      </>
    );

  return (
    <>
      <Heading text="Recommended for you" />
      <section>
        <InfiniteScroll
          dataLength={recommendedShows ? recommendedShows.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          // below is a loader for loading next page
          // if there is an error loading next page, just hide the spinner and show error component in place of spinner
          loader={
            isFetchNextPageError ? (
              <Error message="We are unable to get more recommended shows at the moment. Please try again later or contact us if the problem persists." />
            ) : (
              <Spinner />
            )
          }
          scrollThreshold={0.8}
        >
          <ShowsListStyled>
            {recommendedShows?.map((show) => (
              <ShowItem key={show?.id} show={show} recommended />
            ))}
          </ShowsListStyled>
        </InfiniteScroll>
      </section>
    </>
  );
}

export default Recommended;
