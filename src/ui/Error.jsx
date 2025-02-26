import { RiErrorWarningLine } from "react-icons/ri";

function Error({ message }) {
  return (
    <p className="my-10 flex items-center justify-center gap-2 text-center">
      <RiErrorWarningLine className="text-accentColor" />
      {message}
    </p>
  );
}

export default Error;
