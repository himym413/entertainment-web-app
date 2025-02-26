import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mx-6 mt-4 flex flex-col items-center gap-4 text-center lg:ml-0 lg:mt-20 lg:gap-10">
      <Link>
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          className="w-14 md:w-20"
        />
      </Link>
      <p className="text-bodyS md:text-headingXS">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  );
}

export default About;
