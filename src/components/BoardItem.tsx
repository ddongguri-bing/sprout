import { Link, useNavigate } from "react-router";
import CommentSvg from "../assets/comment.svg";
import Like from "../assets/like.svg";
import Comments from "./Comments";
import { useState, useEffect } from "react";
import { Comment } from "../api/board";
import darkComment from "../assets/dark_comment.svg";
import darkLike from "../assets/dark_like.svg";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const calculateTimeDifference = (sentAt: string | number | Date) => {
  const sentTime = new Date(sentAt).getTime();
  const currentTime = new Date().getTime();
  const differenceInMs = currentTime - sentTime;
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays > 0) {
    return `${differenceInDays}일 전`;
  } else if (differenceInHours === 0) {
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
    return `${differenceInMinutes}분 전`;
  } else {
    return `${differenceInHours}시간 전`;
  }
};

export default function BoardItem({
  isDetail,
  comments,
  postContent,
  postImages,
  likesCount,
  createdAt,
  commentCount,
  author,
  postId,
  channelId,
}: {
  isDetail?: boolean;
  comments?: Comment[];
  postContent: string;
  postImages: string[];
  likesCount: number;
  createdAt: string;
  commentCount: number;
  author: {
    username: string;
    email: string;
    userId?: string;
  };
  postId: string;
  channelId: string;
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const exactDate = new Date(createdAt).toLocaleString();

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]');
  }, []);

  const mainContents = (
    <div className="w-full max-w-[777px] flex flex-col items-start gap-5">
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate(`/user/${author.userId}`);
        }}
        className="flex gap-[10px] items-center cursor-pointer"
      >
        <div className="w-[75px] h-[75px] min-w-[75px] min-h-[75px] rounded-[8px] bg-whiteDark"></div>
        <div>
          <h3 className="font-bold line-clamp-1">{author.username}</h3>
          <p className="text-sm text-gray dark:text-whiteDark">
            {author.email}
          </p>
        </div>
      </div>
      <div className="w-full pl-[89px]">
        <div className="w-full max-w-[688px] font-medium flex flex-col gap-[10px]">
          {/* 게시물 내용 */}
          <div>{postContent}</div>
          {/* 이미지 */}
          {postImages.length > 0 && (
            <a
              href={postImages[0]}
              data-fancybox="gallery"
              data-caption={postContent}
            >
              <div
                className="w-full h-[450px] bg-whiteDark rounded-[8px] bg-cover bg-center"
                style={{ backgroundImage: `url(${postImages[0]})` }}
              />
            </a>
          )}
          {/* 하단 컨텐츠 */}
          <div className="flex justify-between mt-[10px] text-sm px-[5px]">
            <div className="flex items-center gap-[30px]">
              <button className="flex items-center gap-[10px]">
                <img
                  src={darkComment}
                  alt="comment icon"
                  className="dark:block hidden"
                />
                <img
                  src={CommentSvg}
                  alt="comment icon"
                  className="dark:hidden block"
                />
                {commentCount}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("좋아요");
                }}
                className="flex items-center gap-[10px]"
              >
                <img
                  src={darkLike}
                  alt="like icon"
                  className="dark:block hidden"
                />
                <img src={Like} alt="like icon" className="dark:hidden block" />
                {likesCount}
              </button>
            </div>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="text-gray dark:text-whiteDark relative"
            >
              {calculateTimeDifference(createdAt)}

              {isHovered && (
                <div
                  className="absolute w-[170px] text-xs p-2 rounded-lg -top-[40px] left-1/2 transform -translate-x-1/2 z-10 
                  bg-black text-white dark:bg-whiteDark dark:text-black"
                >
                  {exactDate}
                </div>
              )}
            </div>
          </div>
          {/* 댓글 */}
          {comments && <Comments comments={comments} />}
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
      to={`/board/${channelId}/${postId}`}
      className="p-[30px] border-b border-whiteDark dark:border-gray flex flex-col items-center transition-all hover:bg-whiteDark/30 dark:hover:bg-grayDark"
    >
      {mainContents}
    </Link>
  );
}
