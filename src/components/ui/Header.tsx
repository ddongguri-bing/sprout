import { Link } from "react-router";
import images from "../../assets";
import SearchBar from "../search/SearchBar";
import ThemeToggle from "../common/ThemeToggle";
import { useAuthStore } from "../../stores/authStore";
import Navbar from "./Navbar";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="w-[257px] max-h-screen h-screen sticky top-0 left-0 border-r border-whiteDark dark:border-gray py-[21px] px-[32px] flex flex-col items-start">
      <h1 className="mb-[50px]">
        <Link to={"/"}>
          <img className="w-[188px]" src={images.Logo} alt="main logo" />
        </Link>
      </h1>
      <div>11</div>
      <SearchBar />
      <div className="flex items-center gap-[10px] mb-[20px]">
        <h2 className="font-bold">게시판 목록</h2>
        {user && user.role === "SuperAdmin" && (
          <Link to={"/admin"}>
            <img
              className="dark:invert"
              src={images.Setting}
              alt="setting icon"
            />
          </Link>
        )}
      </div>
      <Navbar />
      <ThemeToggle />
    </header>
  );
}
