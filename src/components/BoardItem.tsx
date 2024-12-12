import { Link, useNavigate } from "react-router";
import CommentSvg from "../assets/comment.svg";
import Like from "../assets/like.svg";
import Comments from "./Comments";
import { useState, useEffect } from "react";
import { Comment, createLike, deleteLike, getPostById } from "../api/board";
import darkComment from "../assets/dark_comment.svg";
import darkLike from "../assets/dark_like.svg";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Avata from "./Avata";
import like_fill from "../assets/like_fill.svg";
import { useAuthStore } from "../stores/authStore";
import { postNotification } from "../api/notification";
import { useModal } from "../stores/modalStore";

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
    userId: string;
    image?: string;
  };
  postId: string;
  channelId: string;
}) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const exactDate = new Date(createdAt).toLocaleString();
  const [likeId, setLikeId] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState(likesCount);
  const setOpen = useModal((state) => state.setModalOpen);
  const setModalOpts = useModal((state) => state.setModalOpts);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [commentsCount, setCommentsCount] = useState(commentCount);

  const updateCommentCount = (newCount: number) => {
    setCommentsCount(newCount);
  };
  const handleLikeModal = () => {
    setModalOpts({
      message: "로그인 후 좋아요를 눌러주세요!",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);
        navigate("/auth/signIn");
      },
    });
    setOpen(true);
  };
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const post = await getPostById(postId);
        if (!user) return;
        const currentUserLike = post.likes.find(
          (like: { user: string }) => like.user === user._id
        );
        if (currentUserLike) {
          setLikeId(currentUserLike._id);
        } else {
          setLikeId(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostData();
    Fancybox.bind('[data-fancybox="gallery"]');
  }, [postId, user]);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      handleLikeModal();
      return;
    }
    if (likeId) {
      try {
        await deleteLike(likeId);
        setLikeId(null);
        const updatedPost = await getPostById(postId);
        setLikeCount(updatedPost.likes.length);
      } catch (error) {
        console.error("좋아요 취소 중 오류 발생:", error);
      }
    } else {
      try {
        const response = await createLike(postId);
        setLikeId(response._id);

        const updatedPost = await getPostById(postId);
        await postNotification({
          notificationType: "LIKE",
          notificationTypeId: response._id,
          userId: author.userId,
          postId,
        });
        setLikeCount(updatedPost.likes.length);
      } catch (error) {
        console.error("좋아요 추가 중 오류 발생:", error);
      }
    }
  };

  const mainContents = (
    <div className="w-full max-w-[777px] flex flex-col items-start gap-5">
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate(`/user/${author.userId}`);
        }}
        className="flex gap-[10px] items-center cursor-pointer"
      >
        <Avata profile={author.image} size={"md"} />
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
          <div className="whitespace-pre-line">{postContent}</div>
          {/* 이미지 */}
          {postImages.length > 0 && (
            <>
              {isDetail ? (
                <a href={postImages[0]} data-fancybox="gallery">
                  <div
                    className="w-full h-[450px] bg-whiteDark rounded-[8px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${postImages[0]})` }}
                  />
                </a>
              ) : (
                <div
                  className="w-full h-[450px] bg-whiteDark rounded-[8px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${postImages[0]})` }}
                />
              )}
            </>
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
                {commentsCount}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLikeClick();
                }}
                className="flex items-center gap-[10px]"
              >
                <img
                  src={likeId ? like_fill : darkLike}
                  alt="like icon"
                  className="dark:block hidden"
                />
                <img
                  src={likeId ? like_fill : Like}
                  alt="like icon"
                  className="dark:hidden block"
                />
                {likeCount}
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
                  className="absolute w-[156px] text-xs p-2 rounded-lg -top-[40px] left-1/2 transform -translate-x-1/2 z-10 
                  bg-black text-white dark:bg-whiteDark dark:text-black"
                >
                  {exactDate}
                </div>
              )}
            </div>
          </div>
          {/* 댓글 */}
          {comments && (
            <Comments
              comments={comments}
              postId={postId}
              userId={author.userId}
              updateCommentCount={updateCommentCount}
            />
          )}
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
