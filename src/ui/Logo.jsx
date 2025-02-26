import logo from "../assets/logo.svg";

function Logo({ tailwindClasses }) {
  return <img src={logo} alt="logo" className={tailwindClasses} />;
}

export default Logo;
