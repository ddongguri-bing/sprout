import { useNavigate, useParams } from "react-router";
import images from "../../assets";
import Navbar from "./Navbar";

export default function MobileHeader() {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 left-0 bg-white z-20 lg:hidden">
      <div className="border-b border-whiteDark">
        {postId ? (
          <div className="h-[58px] px-[20px] sticky top-0 left-0 flex justify-between items-center dark:text-white bg-white dark:bg-black dark:border-gray z-10">
            <button onClick={() => navigate(-1)} className="">
              <img
                className="dark:invert dark:hover:fill-white"
                src={images.Back}
                alt="back icon"
              />
            </button>
            <div className="flex items-center gap-5">
            </div>
          </div>
        ) : (
          <h1 className="ml-3 flex justify-center">
            <img className="w-[188px]" src={images.Logo} alt="main logo" />
          </h1>
        )}
      </div>
      <Navbar />
    </header>
  );
}
