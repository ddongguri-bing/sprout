import { Link } from "react-router";
import Notfound from "../assets/not_found.svg";
import NotfoundIn from "../assets/not_found_i.svg";
import { useTheme } from "../stores/themeStore";
export default function NotFound() {
  const isDark = useTheme((state) => state.isDarkMode);
  return (
    <div className="w-full h-screen  flex items-center justify-center bg-white dark:bg-black">
      <div className="w-full gap-[100px] flex items-start justify-center">
        <img src={isDark ? NotfoundIn : Notfound} alt="not found" />
        <div className="flex flex-col">
          <div className="text-[80px] leading-[57px] mb-10 font-angkor text-main">
            404
          </div>
          <div className="text-[105px] leading-[75px] mb-20 font-angkor text-black dark:text-white">
            ERROR
          </div>
          <p className="text-gray dark:text-whiteDark text-[22px] mb-10">
            페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />
            입력하신 주소가 정확한지 다시 한 번 확인해주세요.
          </p>
          <Link
            to={"/"}
            className="w-[250px] h-[60px] flex items-center justify-center font-angkor text-[20px] bg-main rounded-[8px]"
          >
            GO TO SPROUT
          </Link>
        </div>
      </div>
    </div>
  );
}
