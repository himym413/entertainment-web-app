import { useForm } from "react-hook-form";
import { useUser } from "../../features/auth/useUser";
import toast from "react-hot-toast";
import { useUpdatePassword } from "./useUpdatePassword";

function ProfileChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    reset,
  } = useForm();

  const { user } = useUser();
  const { validatePassword, updatePassword, isPending, isUpdating } =
    useUpdatePassword();

  async function onSubmit({ currentPassword, newPassword }) {
    const email = user.email;

    // validatePassword is mutation fn from useUpdatePassword that checks if current password is valid
    validatePassword(
      { email, password: currentPassword },
      {
        // if current password is valid, we update the password to newPassword
        onSuccess: () => {
          updatePassword({ email, password: newPassword });
          reset();
        },
        // if current password is not valid, show error
        onError: () => {
          toast.error("Wrong password");
          reset();
        },
      },
    );
  }

  return (
    <section className="mb-8 mt-10 customMD:mt-14">
      <h2 className="mb-4 text-headingXS font-normal text-accentColor customMD:text-headingSM">
        Settings
      </h2>
      <form
        className="changePasswordForm mb-8 flex w-2/3 flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="mb-2 font-light customMD:text-headingXS">
          Change password:
        </h3>
        <input
          id="currentPassword"
          type="password"
          placeholder="Current password"
          autoComplete="current-password"
          className="max-w-[400px] rounded-md border border-iconsColor bg-transparent py-1 pl-2 font-light outline-none customMD:text-headingXS"
          {...register("currentPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <input
          id="newPassword"
          type="password"
          placeholder="New password"
          autoComplete="new-password"
          className="max-w-[400px] rounded-md border border-iconsColor bg-transparent py-1 pl-2 font-light outline-none customMD:text-headingXS"
          {...register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          className="max-w-[400px] rounded-md border border-iconsColor bg-transparent py-1 pl-2 font-light outline-none customMD:text-headingXS"
          {...register("confirmPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
        />

        <button
          type="submit"
          className={`mt-4 w-fit rounded-md px-4 py-2 text-white transition ${
            isValid
              ? "bg-primaryColor hover:bg-opacity-80"
              : "cursor-not-allowed bg-gray-400"
          }`}
          disabled={!isValid || isPending || isUpdating}
        >
          {isPending || isUpdating ? "Updating..." : "Change Password"}
        </button>
      </form>
    </section>
  );
}

export default ProfileChangePassword;
