import { useBookmark } from "./useBookmark";
import { useSearchQueries } from "../../hooks/useSearchQueries";

import { iconBookmarkEmpty } from "../../assets/svgIcons";
import { iconBookmarkFull } from "../../assets/svgIcons";

function BookmarkButton({ recommended, details, show }) {
  const { page, query, bookmarksPage } = useSearchQueries();
  const { bookmark, isPending, isBookmarked } = useBookmark(
    show,
    page,
    query,
    bookmarksPage,
  );

  // bookmark button styles based on page we are on
  const stylesConfig = {
    recommended: "md:right-4",

    trending: "md:right-6 md:h-10 md:w-10",

    details: "inline-block bg-black w-9 h-9",
  };

  function handleBookmarkClick(e) {
    e.preventDefault();

    bookmark({ show });
  }

  return (
    <button
      className={`bookmarkBtn bookmark-hover-and-focus ${isBookmarked ? "bookmark-full-hover-and-focus" : "opacity-50"} right-2 top-2 flex items-center justify-center rounded-full bg-bgAppColor md:top-4 ${recommended ? stylesConfig.recommended : stylesConfig.trending} ${details ? stylesConfig.details : "absolute h-8 w-8"}`}
      onClick={handleBookmarkClick}
      disabled={isPending || !show?.id}
    >
      {isBookmarked ? iconBookmarkFull : iconBookmarkEmpty}
    </button>
  );
}

export default BookmarkButton;
