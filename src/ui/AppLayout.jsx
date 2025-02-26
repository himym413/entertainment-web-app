import { Outlet } from "react-router-dom";
import Navigation from "../features/home/Navigation";
import Search from "../features/home/Search";

function AppLayout() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-9">
      <Navigation />
      <main className="overflow-hidden lg:ml-[164px] lg:mt-16 lg:flex lg:w-full lg:flex-col lg:gap-8">
        <Search />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
