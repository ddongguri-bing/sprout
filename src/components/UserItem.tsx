import { Link } from "react-router";

export default function UserItem() {
  return (
    <li className="w-full">
      <Link to="/" className="flex gap-[10px] items-center">
        <div className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-[8px] bg-whiteDark"></div>
        <div className="text-xs">
          <h3 className="font-bold line-clamp-1">사용자 이름</h3>
          <p>test@naver.com</p>
        </div>
      </Link>
    </li>
  );
}
