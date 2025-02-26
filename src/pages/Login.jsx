import Logo from "../ui/Logo";
import AuthForm from "../features/auth/AuthForm";

function Login() {
  return (
    <main className="flex flex-col items-center gap-[60px] pt-12 md:gap-[72px] md:pt-20">
      <Logo tailwindClasses={"w-8 h-6"} />
      <AuthForm isSignUp={false} />
    </main>
  );
}

export default Login;
