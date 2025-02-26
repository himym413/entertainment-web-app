import { useProfile } from "../auth/useProfile";
import { useUser } from "../auth/useUser";
import { useUpdateAvatar } from "./useUpdateAvatar";

import Spinner from "../../ui/Spinner";

function ProfileOverview() {
  const { user } = useUser();
  const { profile } = useProfile();
  const { uploadAvatar, isUploadingAvatar } = useUpdateAvatar();

  function handleAvatarChange(e) {
    uploadAvatar({ id: profile.id, avatarFile: e.target.files[0] });
  }

  return (
    <section>
      <h2 className="mb-4 text-headingXS font-normal text-accentColor customMD:text-headingSM">
        Profile overview
      </h2>
      <div className="flex items-center gap-8 customMD:gap-10">
        <img
          src={profile?.avatar_url}
          alt="Avatar"
          className="h-36 w-36 rounded-full customMD:h-44 customMD:w-44"
        />
        <div className="flex flex-col gap-2 customMD:gap-3">
          <p className="text-bodyM font-thin customMD:text-headingXS">
            {user?.email}
          </p>
          <p className="text-bodyM font-thin customMD:text-headingXS">
            Created at: {new Date(user?.created_at).toLocaleDateString()}
          </p>
          <label
            htmlFor="uploadProfileImage"
            className={`mt-2 inline-block cursor-pointer rounded-md border px-2 py-1 font-light customMD:text-headingXS lg:hover:scale-105 ${isUploadingAvatar && "pointer-events-none"}`}
          >
            {isUploadingAvatar ? "Uploading..." : "Change avatar"}
          </label>
          <input
            id="uploadProfileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>
    </section>
  );
}

export default ProfileOverview;
