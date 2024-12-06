import { Outlet } from "react-router";
import Header from "../components/Header";
import Aside from "../components/Aside";

export default function MainLayout() {
  return (
    <div className="w-full flex min-h-screen text-black">
      <Header />
      <Outlet />
      <Aside />
    </div>
  );
}
