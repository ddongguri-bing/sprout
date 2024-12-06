import { Link } from "react-router";

export default function CommentItem() {
  return (
    <div className="flex gap-[10px] items-start">
      <Link to={"/user/1"}>
        <div className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-[8px] bg-whiteDark"></div>
      </Link>
      <div>
        <Link to={"/user/1"}>
          <h3 className="font-bold line-clamp-1 text-xs">사용자 이름</h3>
        </Link>
        <p className="text-gray text-sm">
          아주 긴 댓글을 달면 어떻게 되는건지 한 번 보자
          아아아아아ㅏ아ㅏ아아ㅏ아아아ㅏ아아아아아아ㅏ아아아아ㅇ아아ㅏ아아아아아아아아ㅏ아아앙ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </p>
      </div>
    </div>
  );
}
