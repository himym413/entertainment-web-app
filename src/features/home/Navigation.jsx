import { NavLink } from "react-router-dom";
import { useProfile } from "../auth/useProfile";

import "../../styles/customClasses.css";

import Logo from "../../ui/Logo";
import {
  iconNavBookmarks,
  iconNavHome,
  iconNavMovies,
  iconNavTv,
} from "../../assets/svgIcons";
import { FcAbout } from "react-icons/fc";

function Navigation() {
  const { profile, isLoading } = useProfile();

  return (
    <nav
      className="sticky top-0 z-10 bg-primaryColor p-4 md:mx-6 md:mt-6 md:rounded-md md:p-5 md:pr-4 lg:fixed lg:my-8 lg:ml-8 lg:h-[calc(100%-64px)] lg:max-h-heightNavigationDesktop lg:w-24 lg:rounded-[20px] lg:p-7"
      aria-label="Main"
    >
      <ul className="flex items-center justify-between lg:h-full lg:flex-col lg:justify-normal lg:gap-10 lg:overflow-hidden">
        <li>
          <Logo tailwindClasses={"h-5 w-6 md:h-7 md:w-8"} />
        </li>
        <div className="flex items-center gap-6 md:gap-8 lg:mb-auto lg:flex-col lg:gap-10">
          <li className="homePage link-hover-and-focus">
            <NavLink to="/">{iconNavHome}</NavLink>
          </li>
          <li className="link-hover-and-focus">
            <NavLink to="/movies">{iconNavMovies}</NavLink>
          </li>
          <li className="link-hover-and-focus">
            <NavLink to="/tv">{iconNavTv}</NavLink>
          </li>
          <li className="link-hover-and-focus">
            <NavLink to="/bookmarks">{iconNavBookmarks}</NavLink>
          </li>
        </div>
        <div className="flex gap-2 lg:h-fit lg:flex-col">
          <li className="lg:w-10">
            <NavLink to="/about" className="about">
              <FcAbout className="h-6 w-6 rounded-xl md:h-8 md:w-8 md:rounded-2xl lg:h-10 lg:w-10 lg:rounded-3xl" />
            </NavLink>
          </li>

          <li className="lg:w-10">
            <NavLink to="/account">
              <img
                src={profile?.avatar_url}
                alt="Avatar"
                className="h-6 w-6 rounded-xl border border-white md:h-8 md:w-8 md:rounded-2xl lg:h-10 lg:w-10 lg:rounded-3xl"
              />
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
