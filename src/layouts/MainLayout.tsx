import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      Main
      <Outlet />
    </div>
  );
}
