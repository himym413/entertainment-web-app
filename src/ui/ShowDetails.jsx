import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { LOCAL_STORAGE_SCROLL_Y_KEY } from "../utils/constants";

import {
  getExternalId,
  getGenreList,
  getShowIMDB,
  getTrailer,
} from "../services/apiTMDB";

import GoBackButton from "./GoBackButton";
import BookmarkButton from "../features/bookmarks/BookmarkButton";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";

function ShowDetails() {
  // declaring variables and getting parameters
  const [show, setShow] = useState({});
  const [trailer, setTrailer] = useState({});
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { showId: id } = useParams();
  const showType = location.pathname.split("/").at(1).split("-").at(0);

  // for handling scroll position
  // if user goes back from show details to home page, scroll should be kept
  // if user goes anywhere else from show details, scroll position should be removed (0)
  function handleClick(e) {
    if (!e.target.closest(".backButton") && !e.target.closest(".homePage"))
      localStorage.removeItem(LOCAL_STORAGE_SCROLL_Y_KEY);
  }

  // this useEffect listens for click event, in order to keep or remove scroll position from localStorage
  useEffect(function () {
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  // async function inside useEffect to get show, trailer and genres
  useEffect(() => {
    async function getShow() {
      const idIMDB = await getExternalId(id, showType);
      if (!idIMDB) return setIsLoading(false);
      const show = await getShowIMDB(idIMDB);
      const video = await getTrailer(showType, id);
      const genreList = await getGenreList(showType);
      const genres = [];

      show?.genre_ids.map((id) => {
        genreList.map((genre) => {
          if (genre.id === id) genres.push(genre.name);
        });
      });

      setGenres(genres);
      setTrailer(video);
      setShow(show);
      setIsLoading(false);
    }
    getShow();
  }, []);

  // wait for show to load
  if (isLoading) return <Spinner />;

  // if there is no info about a show
  if (Object.keys(show).length === 0)
    return (
      <div className="flex flex-col items-center">
        <Error message="We currently have no information available about a show you are interested in." />
        <GoBackButton error />
      </div>
    );

  return (
    <section className="mb-5 lg:relative lg:flex lg:justify-evenly lg:gap-0 lg:pt-12">
      <GoBackButton />
      {trailer ? (
        <YouTube
          videoId={trailer.key}
          className="trailerContainer lg:w-1/2"
          iframeClassName="trailerVideo"
        />
      ) : (
        <Error message="Trailer not available" />
      )}
      <div className="m-4 customMD:flex customMD:flex-col customMD:items-center lg:m-0 lg:mr-5 lg:w-1/2">
        <div className="mb-3 flex items-center gap-4">
          <h1 className="text-headingXS md:text-headingSM lg:text-headingL">
            {show.title || show.name} (
            {show.release_date?.split("-").at(0) ||
              show.first_air_date?.split("-").at(0)}
            )
          </h1>
          <BookmarkButton show={show} details />
        </div>
        <ul className="mb-4 flex flex-wrap gap-1 text-bodyS font-light lg:text-[16px]">
          {genres.map((genre) => (
            <li
              className="rounded-full bg-black px-2 py-1 opacity-50"
              key={genre}
            >
              <p>{genre}</p>
            </li>
          ))}
        </ul>
        {show.overview ? (
          <p className="max-w-[500px] text-bodyM font-light md:text-[16px] lg:text-headingXS">
            {show.overview}
          </p>
        ) : (
          <Error message="Overview not available" />
        )}
      </div>
    </section>
  );
}

export default ShowDetails;
