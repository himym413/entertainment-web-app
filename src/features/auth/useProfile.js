import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentProfile } from "../../services/apiProfiles";

export function useProfile() {
  const queryClient = useQueryClient();
  const id = queryClient.getQueryData(["user"])?.id;

  const {
    data: profile,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getCurrentProfile(id),
  });

  return {
    profile,
    isLoading,
    isFetching,
  };
}
