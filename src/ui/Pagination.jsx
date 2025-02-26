import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiDotsThree } from "react-icons/pi";

import PaginationItem from "./PaginationItem";

function AmazonPagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let page = Number(searchParams.get("page"));

  useEffect(
    function () {
      if (!page) {
        searchParams.set("page", 1);
        setSearchParams(searchParams);
        page = Number(searchParams.get("page"));
      }

      window.scrollTo(0, 0);
    },
    [page],
  );

  function handleNext() {
    let page = Number(searchParams.get("page"));
    searchParams.set("page", ++page);
    setSearchParams(searchParams);
  }

  function handlePrev() {
    let page = Number(searchParams.get("page"));
    searchParams.set("page", --page);
    setSearchParams(searchParams);
  }

  return (
    <div className="mx-auto mb-2 flex w-fit max-w-full items-stretch justify-center gap-1 rounded-md border border-black border-opacity-50 font-light customMD:gap-2">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="flex items-center px-2 py-1 disabled:opacity-20 disabled:hover:bg-transparent customMD:px-4 customMD:py-2 lg:hover:rounded-l-md lg:hover:bg-accentColor"
      >
        <IoIosArrowBack />
        Previous
      </button>
      <ul className="flex items-center">
        {totalPages === 3 && (
          <>
            <PaginationItem number={1} />
            <PaginationItem number={2} />
            <PaginationItem number={3} />
          </>
        )}

        {totalPages === 4 && (
          <>
            <PaginationItem number={1} />
            <PaginationItem number={2} />
            <PaginationItem number={3} />
            <PaginationItem number={4} />
          </>
        )}

        {totalPages === 5 && (
          <>
            <PaginationItem number={1} />
            <PaginationItem number={2} />
            <PaginationItem number={3} />
            <PaginationItem number={4} />
            <PaginationItem number={5} />
          </>
        )}

        {totalPages !== 3 && totalPages !== 4 && totalPages !== 5 && (
          <>
            <PaginationItem number={1} />

            {totalPages >= 3 && page >= 5 && (
              <li className="p-2">
                <PiDotsThree />
              </li>
            )}

            {page === totalPages && totalPages >= 6 && (
              <PaginationItem number={totalPages - 2} />
            )}

            {totalPages >= 2 && (page === 1 || page === 4) && (
              <PaginationItem number={2} />
            )}

            {totalPages >= 3 && page === 1 && <PaginationItem number={3} />}

            {page > 2 && <PaginationItem number={page - 1} />}
            {page >= 2 && <PaginationItem number={page} />}
            {page >= 2 && page !== totalPages && (
              <PaginationItem number={page + 1} />
            )}

            {totalPages > 5 && page < totalPages - 3 && (
              <li className="p-2">
                <PiDotsThree />
              </li>
            )}

            {page === totalPages - 3 && (
              <PaginationItem number={totalPages - 1} />
            )}

            {totalPages >= 3 && page < totalPages - 1 && (
              <PaginationItem
                disabled={page < totalPages - 3}
                number={totalPages}
              />
            )}
          </>
        )}
      </ul>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="flex items-center px-2 py-1 disabled:opacity-20 disabled:hover:bg-transparent customMD:px-4 customMD:py-2 lg:hover:rounded-r-md lg:hover:bg-accentColor"
      >
        Next
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default AmazonPagination;
