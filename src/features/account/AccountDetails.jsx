import LogoutButton from "../auth/LogoutButton";
import ProfileChangePassword from "./ProfileChangePassword";
import ProfileOverview from "./ProfileOverview";
import ProfilePreferences from "./ProfilePreferences";

function AccountDetails() {
  return (
    <div className="ml-4 customMD:ml-10">
      <ProfileOverview />

      <ProfilePreferences />

      <ProfileChangePassword />

      <LogoutButton />
    </div>
  );
}

export default AccountDetails;
