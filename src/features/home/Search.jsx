import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { iconSearch } from "../../assets/svgIcons";

function Search() {
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  // Changing search input placeholder based on URL
  let location = useLocation();
  let path = location.pathname;
  let placeholder =
    path === "/"
      ? "Search for movies or TV series"
      : path === "/movies"
        ? "Search for movies"
        : path === "/tv"
          ? "Search for TV series"
          : path === "/bookmarks"
            ? "Search for bookmarked shows"
            : null;

  // reset form (input field) on page change, not on reload
  useEffect(
    function () {
      let query = searchParams.get("search");
      if (!query) reset();
      if (query) setValue("search", query);
    },
    [path],
  );

  // set search params on form submit, it should always start on first page
  function onSubmit() {
    searchParams.set("search", getValues("search"));
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  // if there is no placeholder, it also means that we are on a page that does not need Search component, so we return null
  if (!placeholder) return null;

  return (
    <form
      className="mx-4 mb-2 flex items-center gap-4 md:mx-6 md:mb-6 md:gap-6 lg:mx-0 lg:mb-0 lg:mr-9 lg:items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="search" className="cursor-pointer">
        {iconSearch}
      </label>
      <input
        {...register("search")}
        id="search"
        type="text"
        placeholder={placeholder}
        className="block w-full cursor-pointer bg-transparent font-light caret-accentColor outline-none md:text-headingSM lg:mr-9 lg:w-10/12 lg:pb-[17px] lg:focus:border-b lg:focus:border-iconsColor lg:focus:pb-4"
      />
    </form>
  );
}

export default Search;
