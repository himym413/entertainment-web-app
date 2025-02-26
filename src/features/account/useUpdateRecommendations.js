import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecommendations as updateRecommendationsApi } from "../../services/apiProfiles";
import toast from "react-hot-toast";

export function useUpdateRecommendations() {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(["profile"]);

  const { mutate: updateRecommendations, isPending } = useMutation({
    mutationFn: () =>
      updateRecommendationsApi(profile.id, !profile.recommendations),
    onSuccess: () => {
      queryClient.setQueryData(["profile"], {
        ...profile,
        recommendations: !profile.recommendations,
      });
    },
    onError: () => toast.error("There was an error toggling recommendations"),
  });

  return { updateRecommendations, isPending };
}
