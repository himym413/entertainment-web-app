import { ThreeDots } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <ThreeDots color="#5a698f" height={60} width={60} />
    </div>
  );
}

export default Spinner;
