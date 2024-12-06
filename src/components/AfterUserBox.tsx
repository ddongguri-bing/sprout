import { Link } from "react-router";
import Setting from "../assets/setting.svg";
export default function AfterUserBox() {
  return (
    <div className="pb-5 border-b border-whiteDark">
      <div className="flex justify-end">
        <Link to={"/"}>
          <img src={Setting} alt="setting icon" />
        </Link>
      </div>
      <Link to="/" className="flex gap-[10px] items-center">
        <div className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-[8px] bg-whiteDark"></div>
        <div>
          <h3 className="text-sm font-bold line-clamp-1">사용자 이름</h3>
          <p className="text-xs text-gray">test@naver.com</p>
        </div>
      </Link>
    </div>
  );
}
