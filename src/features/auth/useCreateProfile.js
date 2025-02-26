import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkAndCreateProfile as checkAndCreateProfileApi } from "../../services/apiProfiles";

// custom hook that checks if profile table row exists for auth user
// if it does, it does nothing
// if it does not, it creates new profile table row for auth user
export function useCreateProfile() {
  const queryClient = useQueryClient();

  const { mutate: checkAndCreateProfile, isPending: isCreating } = useMutation({
    mutationFn: () => {
      const user = queryClient.getQueryData(["user"]);
      const id = user?.id;
      if (id) return checkAndCreateProfileApi(id);
    },
    onSuccess: (profile) => queryClient.setQueryData(["profile"], profile),
    onError: (err) => console.log(err),
  });

  return { checkAndCreateProfile, isCreating };
}
