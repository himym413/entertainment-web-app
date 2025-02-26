import { SCROLL_ITEM_WIDTH } from "../utils/constants";

function ScrollButton({ direction, children }) {
  function handleScroll(e) {
    let direction = e.target.closest("button").dataset.to;
    let el = document.getElementById("trendingContainer");

    if (direction === "left") return (el.scrollLeft -= SCROLL_ITEM_WIDTH);

    el.scrollLeft += SCROLL_ITEM_WIDTH;
  }

  return (
    <button
      data-to={direction}
      className={`absolute ${direction === "left" ? "left-2" : "right-2"} top-1/2 z-10 hidden h-12 -translate-y-1/2 rounded-full bg-bgAppColor px-2 opacity-80 lg:block lg:hover:opacity-100 lg:hover:brightness-200`}
      onClick={handleScroll}
    >
      {children}
    </button>
  );
}

export default ScrollButton;
