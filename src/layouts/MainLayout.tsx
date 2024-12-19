import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "../components/ui/Header";
import Aside from "../components/ui/Aside";
import { useState } from "react";
import MobileHeader from "../components/ui/MobileHeader";
import MobileFooter from "../components/ui/MobileFooter";

const UserSearch = React.lazy(() => import("../components/search/UserSearch"));
const MobileNotiModal = React.lazy(
  () => import("../components/ui/MobileNotiModal")
);

export default function MainLayout() {
  const [userSearchOpen, setUserSearchOpen] = useState<boolean>(false);
  const toggleUserSearch = () => setUserSearchOpen((prev) => !prev);

  const [notiOpen, setNotiOpen] = useState<boolean>(false);
  const toggleNotiOpen = () => setNotiOpen((prev) => !prev);

  return (
    <div className="w-full flex min-h-screen text-black dark:text-white bg-white dark:bg-black md:flex-col">
      <Header />
      <MobileHeader />
      <div className="flex-1 md:pb-[80px] min-w-0">
        <Outlet />
      </div>
      <Aside toggleOpen={toggleUserSearch} />
      {userSearchOpen && (
        <Suspense>
          <UserSearch toggleOpen={toggleUserSearch} />
        </Suspense>
      )}
      <MobileFooter
        userSearchOpen={userSearchOpen}
        toggleUserSearch={toggleUserSearch}
        notiOpen={notiOpen}
        toggleNotiOpen={toggleNotiOpen}
      />
      {notiOpen && (
        <Suspense>
          <MobileNotiModal toggleOpen={toggleNotiOpen} />
        </Suspense>
      )}
    </div>
  );
}
