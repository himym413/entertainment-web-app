import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    data: user,
    isLoading,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isLoading,
    fetchStatus,
    isAuthenticated: user?.role === "authenticated",
  };
}
