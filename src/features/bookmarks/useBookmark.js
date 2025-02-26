import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookmarks } from "../../services/apiProfiles";
import { useProfile } from "../auth/useProfile";
import { useUser } from "../auth/useUser";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ITEMS_PER_BOOKMARK_PAGE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export function useBookmark(show, page, query = "", bookmarksPage) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const checkIfBookmarked = () =>
    profile?.bookmarks &&
    profile?.bookmarks?.length > 0 &&
    profile?.bookmarks?.some((bookmark) => bookmark.id === show.id);

  const [isBookmarked, setIsBookmarked] = useState(checkIfBookmarked);

  useEffect(
    function () {
      setIsBookmarked(checkIfBookmarked);
    },
    [profile?.bookmarks],
  );

  const { mutate: bookmark, isPending } = useMutation({
    mutationFn: ({ show }) => updateBookmarks(user?.id, show),

    onMutate: ({ show }) => {
      // get all bookmarks
      const allBookmarks = queryClient.getQueryData(["profile"])?.bookmarks;

      // get current and next page bookmarks
      const currentPageBookmarks =
        queryClient.getQueryData([Number(page), "bookmarks", query]) || [];
      const nextPageBookmarks =
        queryClient.getQueryData([Number(page) + 1, "bookmarks", query]) || [];

      // check if show is already bookmarked
      const bookmarked = allBookmarks?.some(
        (bookmark) => bookmark.id === show.id,
      );

      // remove or add bookmark based on previous check to profile table
      if (bookmarked) {
        queryClient.setQueryData(["profile"], (oldProfile) => ({
          ...oldProfile,
          bookmarks: oldProfile.bookmarks.filter(
            (bookmark) => bookmark.id !== show.id,
          ),
        }));
      } else {
        queryClient.setQueryData(["profile"], (oldProfile) => ({
          ...oldProfile,
          bookmarks: [...(oldProfile?.bookmarks || []), show],
        }));
      }

      // if inside bookmarks page, and unbookmarking a show, remove it immediatelly by updating bookmarks query key
      if (bookmarked && bookmarksPage) {
        // get next page bookmarks, and if it exists, add first element of the next page to current page
        let nextShow;
        if (nextPageBookmarks?.results?.length > 0) {
          nextShow = nextPageBookmarks.results.at(0);
        }

        // update current page
        queryClient.setQueryData(
          [Number(page), "bookmarks", query],
          (oldData) => ({
            ...oldData,
            results: nextShow
              ? [
                  ...oldData.results.filter(
                    (bookmark) => bookmark.id !== show.id,
                  ),
                  nextShow,
                ]
              : oldData.results.filter((bookmark) => bookmark.id !== show.id),
            total_results: oldData.total_results - 1,
            total_pages: Math.ceil(
              (oldData.total_results - 1) / ITEMS_PER_BOOKMARK_PAGE,
            ),
          }),
        );

        // update next page
        if (nextShow) {
          queryClient.setQueryData(
            [Number(page) + 1, "bookmarks", query],
            (oldData) => ({
              ...oldData,
              results: oldData.results.filter(
                (bookmark) => bookmark.id !== nextShow.id,
              ),
              total_results: oldData.total_results - 1,
              total_pages: Math.ceil(
                (oldData.total_results - 1) / ITEMS_PER_BOOKMARK_PAGE,
              ),
            }),
          );
        }
      }

      return { allBookmarks, currentPageBookmarks, nextPageBookmarks, page };
    },

    onSuccess: (data, _, context) => {
      const isLastItemRemoved =
        (context.currentPageBookmarks?.results?.length || 0) - 1 === 0;
      const isNotFirstPage = Number(context.page) > 1;

      if (isLastItemRemoved && isNotFirstPage && bookmarksPage) {
        const searchParams = new URLSearchParams({
          page: String(Number(context.page) - 1),
        });

        if (query) searchParams.set("search", query); // Only add search param if it exists

        navigate({
          pathname: "/bookmarks",
          search: `?${searchParams.toString()}`,
        });
      }
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(["profile"], (oldProfile) => ({
        ...oldProfile,
        bookmarks: context.allBookmarks,
      }));
      queryClient.setQueryData(
        [Number(page), "bookmarks", query],
        context.currentPageBookmarks,
      );
      queryClient.setQueryData(
        [Number(page) + 1, "bookmarks", query],
        context.nextPageBookmarks,
      );
      toast.error("There seems to be an error. Please try again later.");
      console.log(`ERROR: ${err}`);
    },
  });

  return { bookmark, isPending, isBookmarked };
}
