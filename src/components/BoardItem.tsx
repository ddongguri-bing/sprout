import { Link, useNavigate } from "react-router";
import Comment from "../assets/comment.svg";
import Like from "../assets/like.svg";
import Comments from "./Comments";
export default function BoardItem({
  isDetail,
  comments,
}: {
  isDetail?: boolean;
  comments?: any[];
}) {
  const navigate = useNavigate();
  const mainContents = (
    <div className="w-full max-w-[777px] flex flex-col items-start gap-5 ">
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate("/user/1");
        }}
        className="flex gap-[10px] items-center"
      >
        <div className="w-[75px] h-[75px] min-w-[75px] min-h-[75px] rounded-[8px] bg-whiteDark"></div>
        <div>
          <h3 className="font-bold line-clamp-1">사용자 이름</h3>
          <p className="text-sm text-gray">test@naver.com</p>
        </div>
      </div>
      <div className="w-full pl-[89px]">
        <div className="w-full max-w-[688px] font-medium flex flex-col gap-[10px]">
          {/* Text 컨텐츠 들어가는 곳 */}
          <div>퇴근하고 싶다.</div>
          {/* Image 컨텐츠 들어가는 곳 */}
          <div
            onClick={(e) => {
              e.preventDefault();
              console.log("이미지 클릭");
            }}
            className="w-full grid grid-cols-2 gap-[10px]"
          >
            <div className="bg-whiteDark h-[189px] rounded-[8px]" />
            <div className="bg-whiteDark h-[189px] rounded-[8px]" />
            <div className="bg-whiteDark h-[189px] rounded-[8px]" />
            <div className="bg-whiteDark h-[189px] rounded-[8px]" />
          </div>
          {/* 하단 컨텐츠 들어가는 곳 */}
          <div className="flex justify-between mt-[10px] text-sm px-[5px]">
            <div className="flex items-center gap-[30px]">
              <button className="flex items-center gap-[10px]">
                <img src={Comment} alt="comment icon" />
                100
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("좋아요");
                }}
                className="flex items-center gap-[10px]"
              >
                <img src={Like} alt="like icon" />
                100
              </button>
            </div>
            <div className="text-gray">10분 전</div>
          </div>
          {/* 댓글 컨텐츠 들어가는 곳  */}
          {comments && <Comments />}
        </div>
      </div>
    </div>
  );
  if (isDetail)
    return (
      <div className="p-[30px] flex flex-col items-center">{mainContents}</div>
    );
  return (
    <Link
      to={"/board/1/1"}
      className="p-[30px] border-b border-whiteDark flex flex-col items-center transition-all hover:bg-black/10"
    >
      {mainContents}
    </Link>
  );
}
