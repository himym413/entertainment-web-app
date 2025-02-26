import { CiLogout } from "react-icons/ci";
import { useLogout } from "./useLogout";
import { Circles } from "react-loader-spinner";

function LogoutButton() {
  const { logout, isPending } = useLogout();

  return (
    <button
      onClick={logout}
      disabled={isPending}
      className="mb-8 flex items-center gap-2 text-headingXS font-light text-accentColor customMD:text-headingXS"
    >
      <CiLogout />
      <p className="text-white">Logout</p>
      {isPending && <Circles color="#5a698f" height={20} width={20} />}
    </button>
  );
}

export default LogoutButton;
