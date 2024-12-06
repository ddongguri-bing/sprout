import { Link } from "react-router";
import Notfound from "../assets/not_found.svg";
export default function NotFound() {
  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <div className="w-full gap-[100px] flex items-start justify-center">
        <img src={Notfound} alt="not found" />
        <div className="flex flex-col">
          <div className="text-[80px] leading-[57px] mb-10 font-angkor text-main">
            404
          </div>
          <div className="text-[105px] leading-[75px] mb-20 font-angkor text-black">
            ERROR
          </div>
          <p className="text-gray text-[22px] mb-10">
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
