import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "../components/ui/Header";
import Aside from "../components/ui/Aside";
import { useState } from "react";

const UserSearch = React.lazy(() => import("../components/search/UserSearch"));

export default function MainLayout() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const toggleUserSearch = () => setSearchOpen((prev) => !prev);

  return (
    <div className="w-full flex min-h-screen text-black dark:text-white bg-white dark:bg-black">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Aside toggleOpen={toggleUserSearch} />
      {searchOpen && (
        <Suspense>
          <UserSearch toggleOpen={toggleUserSearch} />
        </Suspense>
      )}
    </div>
  );
}
