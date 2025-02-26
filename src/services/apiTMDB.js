import { BEARER_TOKEN } from "../utils/constants";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

export async function getTrending() {
  // returns trending movies, tv series and people
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/all/week?language=en-US",
    options,
  );

  const data = await res.json();

  return data;
}

export async function getRecommended({ pageParam = 1 }) {
  // Getting recommended movies and tv series, by getting top rated movies and top rated tv series, 20 of each, then joining them and sorting by average vote
  // Beacuse top rated does not contain media type property(movie or tv series), we need to get external IMDB id of each, and check its media type on imdb in order to later update the icon
  const resMovies = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`,
    options,
  );
  const movieData = await resMovies.json();
  let movieIds = movieData.results.map((movie) =>
    getExternalId(movie.id, "movie"),
  );
  movieIds = await Promise.all(movieIds);

  const resTv = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${pageParam}`,
    options,
  );
  const tvData = await resTv.json();
  let tvIds = tvData.results.map((tv) => getExternalId(tv.id, "tv"));
  tvIds = await Promise.all(tvIds);

  let showsIds = movieIds.concat(tvIds);
  let finalData = showsIds.map((id) => getShowIMDB(id));
  finalData = await Promise.all(finalData);

  finalData = finalData.sort((a, b) => b.vote_average - a.vote_average);

  return { finalData, pageParam };
}

export async function getExternalId(id, showType) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${showType}/${id}/external_ids`,
    options,
  );
  const data = await res.json();

  return data.imdb_id;
}

export async function getShowIMDB(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
    options,
  );
  const data = await res.json();
  return data.movie_results[0] || data.tv_results[0];
}

export async function getTrailer(showType, id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${showType}/${id}/videos?language=en-US`,
    options,
  );
  const data = await res.json();

  // get offical youtube trailer
  let video = data.results
    .filter(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    )
    .at(0);

  // get any youtube trailer
  if (!video)
    video = data.results
      .filter((video) => video.site === "YouTube" && video.type === "Trailer")
      .at(0);

  // get any youtube clip
  if (!video)
    video = data.results
      .filter((video) => video.site === "YouTube" && video.type === "Clip")
      .at(0);

  return video;
}

export async function getShows(page, showType) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${showType}/popular?language=en-US&page=${page}`,
    options,
  );
  const data = await res.json();

  return data;
}

export async function searchShows(query, page, showType) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/${showType}?query=${query}&include_adult=false&language=en-US&page=${page}`,
    options,
  );
  const data = await res.json();

  return data;
}

export async function getGenreList(showType) {
  let data;
  if (showType) {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/${showType}/list?language=en`,
      options,
    );
    data = await res.json();
    data = data.genres;
  }

  if (!showType) {
    const resMovie = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      options,
    );
    const movieGenres = await resMovie.json();

    const resTv = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?language=en`,
      options,
    );
    const tvGenres = await resTv.json();

    data = [...movieGenres.genres, ...tvGenres.genres];
  }

  return data;
}
