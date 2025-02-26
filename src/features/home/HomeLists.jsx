import { useSearchQueries } from "../../hooks/useSearchQueries";
import { useProfile } from "../auth/useProfile";

import Trending from "../trending/Trending";
import Recommended from "../recommended/Recommended";
import ShowsList from "../../ui/ShowsList";

function HomeLists() {
  // check for search query
  const { query } = useSearchQueries();
  const { profile } = useProfile();

  // if it exists, render list of searched shows
  if (query) return <ShowsList />;

  // if it does not exist, render standard home page
  return (
    <>
      <Trending />
      {profile?.recommendations ? (
        <Recommended />
      ) : (
        <p className="mx-2 text-center">
          Enable recommendations in your account settings to see recommended
          shows.
        </p>
      )}
    </>
  );
}

export default HomeLists;
