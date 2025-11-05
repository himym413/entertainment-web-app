import { Link } from "react-router-dom";
import {
  iconPlay,
  iconCategoryMovie,
  iconCategoryTv,
} from "../assets/svgIcons";
import { IMAGE_URL, IMAGE_WIDTH } from "../utils/constants";
import missingImage from "../assets/missingImageAlt.svg";

import BookmarkButton from "../features/bookmarks/BookmarkButton";

function ShowItem({ show, recommended = false }) {
  // Destructuring needed data
  let { backdrop_path, title, media_type, year, adult } = {
    ...show,
    title: show?.title || show?.name,
    year:
      show?.first_air_date?.split("-")[0] || show?.release_date?.split("-")[0],
  };

  // each movie has a show.title, and tv series has a show.name
  if (!media_type) media_type = show.title ? "movie" : "tv";
  let linkUrl =
    media_type && media_type === "movie"
      ? `/movie/${show?.id}`
      : `/tv-series/${show?.id}`;

  const imageUrl = backdrop_path
    ? IMAGE_URL + IMAGE_WIDTH + backdrop_path
    : missingImage;

  const stylesConfig = {
    trending: {
      item: "rounded-lg bg-[image:var(--image-url)] bg-cover bg-no-repeat h-[140px] w-60 md:h-[230px] md:w-[470px]",
      descriptionContainer: "absolute bottom-4 left-4 md:bottom-6 md:left-6",
      descriptionText: "text-xs",
      title: "text-bodyM",
    },
    recommended: {
      item: "min-h-[110px] w-[164px] flex flex-col gap-2 gap-y-4 customMDItem1:w-[200px] customMD:w-[190px] md:h-[140px] md:w-[220px] customMDItem3:w-[250px] customMDItem4:w-[280px] customMDItem4:h-[180px] lg:w-[270px] lg:h-[180px] customLGItem1:w-[300px] customLGItem2:w-[320px] customLGItem2:h-[200px] customLGItem3:w-[340px] customLGItem4:w-[320px]  customLGItem5:w-[350px]",
      descriptionContainer: "",
      descriptionText: "text-[11px] md:text-[13px]",
      title: "text-[15px] md:text-headingXS",
    },
  };

  return (
    <Link
      to={linkUrl}
      style={{
        "--image-url": `url('${imageUrl}')`,
      }}
      className={`show-item show-hover-and-focus relative lg:hover:cursor-pointer ${recommended ? stylesConfig.recommended.item : stylesConfig.trending.item}`}
    >
      {recommended && (
        <img
          src={imageUrl}
          className="customMDItem1:w-[200px] customMDItem3:w-[250px] customMDItem4:w-[280px] customMDItem4:h-[174px] customLGItem1:w-[300px] customLGItem2:w-[320px] customLGItem3:w-[340px] customLGItem4:w-[320px] customLGItem5:w-[350px] h-auto w-[164px] rounded-xl customMD:w-[190px] md:w-[220px] lg:w-[270px]"
          alt="Show image"
        />
      )}
      <div
        className={`font-light ${recommended ? stylesConfig.recommended.descriptionContainer : stylesConfig.trending.descriptionContainer}`}
      >
        <div
          className={`flex gap-[6px] opacity-90 md:mb-1 md:text-[16px] ${recommended ? stylesConfig.recommended.descriptionText : stylesConfig.trending.descriptionText}`}
        >
          <p>{year}</p>
          <span className="dot"></span>
          <div className="flex items-center gap-[6px]">
            {media_type === "movie" ? iconCategoryMovie : iconCategoryTv}
            <p>{media_type === "movie" ? "Movie" : "TV Series"}</p>
          </div>
          <span className="dot"></span>
          <p>{adult ? "18+" : "PG"}</p>
        </div>
        <h4
          className={`line-clamp-2 font-medium md:text-[20px] ${recommended ? stylesConfig.recommended.title : stylesConfig.trending.title}`}
        >
          {title}
        </h4>
      </div>
      <BookmarkButton recommended={recommended} show={show} />
      <span className="playBg absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-4 rounded-[28.5px] bg-white bg-opacity-25 p-[6px] pr-7 text-bodyM">
        {iconPlay}
        <p>Play</p>
      </span>
    </Link>
  );
}

export default ShowItem;
