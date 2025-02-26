import { Link } from "react-router-dom";

function LinkRedirect({ text, link, pathname }) {
  return (
    <div className="text-center text-bodyM font-light">
      <span>{text}</span>{" "}
      <Link to={pathname} className="text-accentColor">
        {link}
      </Link>
    </div>
  );
}

export default LinkRedirect;
