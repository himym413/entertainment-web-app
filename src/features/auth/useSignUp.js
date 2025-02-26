import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Confirmation email sent", {
        duration: 5000,
      }); // Show success message
      navigate("/login");
    },
    onError: () => {
      toast.error("There was an error signing up. Please try again.");
    },
  });

  return { signup, isPending };
}
