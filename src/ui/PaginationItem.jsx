import { useSearchParams } from "react-router-dom";

function PaginationItem({ disabled = false, number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  function handleClick(e) {
    if (e.target.closest("li").ariaDisabled === "true") return;

    searchParams.set("page", number);
    setSearchParams(searchParams);
  }

  return (
    <li
      className={`px-2 py-1 customMD:px-4 customMD:py-2 ${disabled ? "opacity-50" : "lg:hover:cursor-pointer lg:hover:bg-accentColor"} ${Number(page) === Number(number) ? "border border-accentColor border-opacity-50" : ""}`}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      {number}
    </li>
  );
}

export default PaginationItem;
