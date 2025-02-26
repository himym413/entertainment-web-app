import { useMutation } from "@tanstack/react-query";
import {
  login,
  updatePassword as updatePasswordApi,
} from "../../services/apiAuth";
import toast from "react-hot-toast";

// Hook for validating the current password and updating it if valid
export function useUpdatePassword() {
  const { mutate: validatePassword, isPending } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
  });

  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: ({ email, password }) => updatePasswordApi({ email, password }),
    onSuccess: () => toast.success("Password successfully updated"),
    onError: () => toast.error("Failed to update password"),
  });

  return { validatePassword, updatePassword, isPending, isUpdating };
}
