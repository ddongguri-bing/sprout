import { Link, useLocation, useNavigate, useParams } from "react-router";
import images from "../../assets";
import Navbar from "./Navbar";
import SearchBar from "../search/SearchBar";
import ThemeToggle from "../common/ThemeToggle";

export default function MobileHeader() {
  const { pathname } = useLocation();
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 left-0 bg-white dark:bg-black z-20 md:block hidden">
      <div className="w-full h-[65px] border-b border-whiteDark dark:border-gray flex items-center px-5">
        {pathname.startsWith("/search") ? (
          <SearchBar />
        ) : postId || pathname.startsWith("/user") || pathname.includes("create") ? (
          <div className="h-[58px] sticky top-0 left-0 flex justify-between items-center dark:text-white bg-white dark:bg-black dark:border-gray z-10">
            <button onClick={() => navigate(-1)} className="">
              <img
                className="dark:invert dark:hover:fill-white"
                src={images.Back}
                alt="back icon"
              />
            </button>
            <div className="flex items-center gap-5"></div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <h1 className="flex justify-center">
              <Link to={"/"}>
                <img className="w-[188px]" src={images.Logo} alt="main logo" />
              </Link>
            </h1>
            <ThemeToggle />
          </div>
        )}
      </div>
      <Navbar />
    </header>
  );
}
