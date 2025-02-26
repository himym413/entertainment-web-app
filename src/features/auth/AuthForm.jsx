import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { useSignUp } from "./useSignup";

import InputLineBottom from "../../ui/InputLineBottom";
import InputError from "../../ui/InputError";
import Button from "../../ui/Button";
import LinkRedirect from "../../ui/LinkRedirect";

function AuthForm({ isSignUp }) {
  // handling form and form inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // custom hooks
  const { login, isPending: isPendingLogin } = useLogin();
  const { signup, isPending: isPendingSignUp } = useSignUp();

  const isPending = isPendingLogin || isPendingSignUp;

  // on submit login or sign up
  function onSubmit(data) {
    const { email, password } = data;
    !isSignUp && login({ email, password });
    isSignUp && signup({ email, password });
  }

  // INPUT STYLING
  const inputStyle =
    "input-hover-and-focus w-full cursor-pointer bg-transparent pb-5 pl-4 text-bodyM font-light caret-accentColor outline-none";

  return (
    <form
      className="w-[calc(100%-3rem)] max-w-[400px] rounded-[10px] bg-primaryColor p-6 pb-8 font-light md:rounded-[20px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-10 text-headingL">{isSignUp ? "Sign Up" : "Login"}</h1>

      <div className="relative">
        <input
          className={inputStyle}
          id="email"
          type="email"
          placeholder="Email address"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {<InputLineBottom />}
        {errors.email && <InputError>{errors.email.message}</InputError>}
      </div>

      <div className="relative">
        <input
          className={inputStyle}
          id="password"
          type="password"
          placeholder="Password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {<InputLineBottom />}
        {errors.password && <InputError>{errors.password.message}</InputError>}
      </div>

      {isSignUp && (
        <div className="relative">
          <input
            className={inputStyle}
            id="repeatPassword"
            type="password"
            placeholder="Repeat password"
            disabled={isPending}
            {...register("repeatPassword", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {<InputLineBottom />}
          {errors.repeatPassword && (
            <InputError>{errors.repeatPassword.message}</InputError>
          )}
        </div>
      )}

      <Button
        text={isSignUp ? "Create an account" : "Login to your account"}
        isPending={isPending}
      />

      {isSignUp ? (
        <LinkRedirect
          text="Already have an account?"
          link="Login"
          pathname="/login"
        />
      ) : (
        <LinkRedirect
          text="Don't have an account?"
          link="Sign Up"
          pathname="/signup"
        />
      )}
    </form>
  );
}

export default AuthForm;
