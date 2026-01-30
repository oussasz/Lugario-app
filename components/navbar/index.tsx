import React, { Suspense } from "react";
import Logo from "./Logo";
import Search from "./Search";
import Categories from "./Categories";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/services/user";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async () => {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-10 ">
      <nav className="py-3 border-b-[1px]">
        <div className="main-container flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
          <div className="flex items-center justify-between gap-3 shrink-0">
            <Logo />
            <UserMenu user={user} />
          </div>
          <div className="w-full md:w-auto md:flex-1 md:px-6">
            <Suspense fallback={<></>}>
              <Search />
            </Suspense>
          </div>
        </div>
      </nav>
      <Categories />
    </header>
  );
};

export default Navbar;
