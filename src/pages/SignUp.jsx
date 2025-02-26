import AuthForm from "../features/auth/AuthForm";
import Logo from "../ui/Logo";

function SignUp() {
  return (
    <main className="flex flex-col items-center gap-[60px] pt-12">
      <Logo tailwindClasses={"w-8 h-6"} />
      <AuthForm isSignUp={true} />
    </main>
  );
}

export default SignUp;
