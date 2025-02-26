import { useTrending } from "./useTrending";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import ShowItem from "../../ui/ShowItem";
import Spinner from "../../ui/Spinner";
import ScrollButton from "../../ui/ScrollButton";
import Error from "../../ui/Error";
import Heading from "../../ui/Heading";

function Trending() {
  const { isLoading, data, isError } = useTrending();

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <Error
        message="There was an error loading data. Please try again later or contact us if
      the problem persists."
      />
    );

  // API returns trending movies, tv series and people, but we only need movies and tv series, a total of 5
  const trendingShows = data.results
    .filter((res) => res.media_type === "movie" || res.media_type === "tv")
    .slice(0, 5);

  return (
    <>
      <Heading text="Trending" />
      <section className="relative mb-6">
        <div
          id="trendingContainer"
          className="scrollbar-hidden overflow-x-scroll scroll-smooth"
        >
          <ScrollButton direction="left">
            <IoIosArrowBack className="h-8 w-8" />
          </ScrollButton>
          <ul className="mx-4 flex w-[1280px] items-center gap-4 md:mx-6 md:mb-10 md:w-[2540px] md:gap-10 lg:mb-0 lg:ml-0 lg:mr-0 lg:w-[2580px]">
            {trendingShows.map((show) => (
              <ShowItem key={show.id} show={show} />
            ))}
          </ul>
          <ScrollButton direction="right">
            <IoIosArrowForward className="h-8 w-8" />
          </ScrollButton>
        </div>
      </section>
    </>
  );
}

export default Trending;
