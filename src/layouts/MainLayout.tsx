import { Outlet } from "react-router";
import Header from "../components/Header";
import Aside from "../components/Aside";
import { useState } from "react";
import UserSearch from "../components/UserSearch";

export default function MainLayout() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const toggleUserSearch = () => setSearchOpen((prev) => !prev);
  return (
    <div className="w-full flex min-h-screen text-black">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Aside toggleOpen={toggleUserSearch} />
      {searchOpen && <UserSearch toggleOpen={toggleUserSearch} />}
    </div>
  );
}
