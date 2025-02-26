import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

function EmailConfirmation() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Success Message */}
      <h1 className="text-headingXS font-semibold text-white md:text-headingSM lg:text-headingL">
        You have successfully confirmed your email address.
      </h1>

      {/* Instruction */}
      <p className="text-bodyM font-light text-gray-300 customMD:text-headingXS">
        Please click below to login.
      </p>

      {/* Login Button */}
      <Link
        to="/login"
        className="mt-4 flex items-center gap-2 rounded-md bg-accentColor px-6 py-3 text-bodyM font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primaryColor"
      >
        Login
        <BsArrowRight className="text-lg" />
      </Link>
    </div>
  );
}

export default EmailConfirmation;
