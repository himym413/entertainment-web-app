import { Circles } from "react-loader-spinner";

function Button({ text, isPending }) {
  let login = text.split(" ")[0] === "Login";
  let className =
    "px-15 mb-6 w-full rounded-md bg-accentColor py-4 text-center text-bodyM lg:hover:bg-white lg:hover:text-primaryColor flex items-center justify-center gap-2";
  className = login ? (className += " mt-4") : className;

  return (
    <button className={className} disabled={isPending}>
      {text}
      {isPending ? <Circles color="#5a698f" width={20} height={20} /> : null}
    </button>
  );
}

export default Button;
