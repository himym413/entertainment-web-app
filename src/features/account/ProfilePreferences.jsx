import { useUpdateRecommendations } from "./useUpdateRecommendations";
import { useProfile } from "../auth/useProfile";
import { useEffect, useState } from "react";
import { getGenreList } from "../../services/apiTMDB";

import Spinner from "../../ui/Spinner";

function ProfilePreferences() {
  const [topGenres, setTopGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();
  const { updateRecommendations, isPending } = useUpdateRecommendations();

  useEffect(() => {
    async function getGenres() {
      if (!profile?.bookmarks?.length) return;
      setIsLoading(true);

      try {
        // Get all genres
        const genreList = await getGenreList();

        // Count genre occurrences
        const genreCount = {};

        profile?.bookmarks?.forEach((bookmark) => {
          bookmark.genre_ids.forEach((genreId) => {
            const genreName = genreList.find((g) => g.id === genreId)?.name;
            if (genreName) {
              genreCount[genreName] = (genreCount[genreName] || 0) + 1;
            }
          });
        });

        // Get top 3 most frequent genres
        const topGenres = Object.entries(genreCount)
          .sort((a, b) => b[1] - a[1]) // Sort by count (desc)
          .slice(0, 3) // Get top 3
          .map(([name]) => name); // Extract genre names

        setTopGenres(topGenres);
        // setGenres(topGenres); // If you have a state for it
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getGenres();
  }, [profile?.bookmarks]);

  const toggleRecommendations = () => {
    updateRecommendations();
  };

  return (
    <section className="mt-10 customMD:mt-14">
      <h2 className="mb-4 text-headingXS font-normal text-accentColor customMD:text-headingSM">
        Preferences
      </h2>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <p className="text-bodyM font-thin customMD:text-headingXS">
          Favorite genres:
        </p>
        <ul className="flex items-center gap-2 text-bodyM font-light customMD:text-headingXS">
          {isLoading && <Spinner />}
          {(!topGenres || topGenres.length === 0) && !isLoading && (
            <p className="text-bodyM font-thin customMD:text-headingXS">
              You haven't bookmarked any shows yet.
            </p>
          )}
          {topGenres?.length > 0 &&
            !isLoading &&
            topGenres.map((genre) => (
              <li key={genre} className="rounded-full bg-iconsColor px-2 py-1">
                {genre}
              </li>
            ))}
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-light customMD:text-headingXS">
          Recommendations:
        </span>
        <button
          onClick={toggleRecommendations}
          className={`rounded-lg px-3 py-1 customMD:text-headingXS ${
            profile?.recommendations ? "bg-green-500" : "bg-accentColor"
          } `}
          disabled={isPending}
        >
          {profile?.recommendations ? "On" : "Off"}
        </button>
      </div>
    </section>
  );
}

export default ProfilePreferences;
