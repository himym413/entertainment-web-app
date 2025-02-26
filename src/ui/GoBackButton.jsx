import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function GoBackButton({ error = false }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <button
      onClick={handleClick}
      className={`backButton mb-4 ml-4 flex items-center gap-1 text-bodyM font-light md:text-headingXS ${error ? "lg: relative" : "lg:absolute lg:left-0 lg:top-0"}`}
    >
      <IoArrowBackOutline />
      Go Back
    </button>
  );
}

export default GoBackButton;
