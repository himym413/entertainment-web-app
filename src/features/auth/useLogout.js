import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_SCROLL_Y_KEY } from "../../utils/constants";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.getItem(LOCAL_STORAGE_SCROLL_Y_KEY)
        ? localStorage.removeItem(LOCAL_STORAGE_SCROLL_Y_KEY)
        : null;
      navigate("/", { replace: true });
    },
  });

  return { logout, isPending };
}
