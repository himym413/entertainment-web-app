import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeAvatarUrl,
  uploadAvatar as uploadAvatarApi,
} from "../../services/apiProfiles";
import toast from "react-hot-toast";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useMutation({
    mutationFn: ({ id, avatarFile }) => uploadAvatarApi({ id, avatarFile }),
    // on success, update query data so that change is visible immediately
    // update avatar_url inside profile (profiles table), so that change is persisted
    onSuccess: (fullAvatarUrl) => {
      let profile = queryClient.getQueryData(["profile"]);
      changeAvatarUrl(profile.id, fullAvatarUrl);
      queryClient.setQueryData(["profile"], {
        ...profile,
        avatar_url: fullAvatarUrl,
      });
    },
    onError: () =>
      toast.error("There was an error uploading image. Please try again."),
  });

  return { uploadAvatar, isUploadingAvatar };
}
