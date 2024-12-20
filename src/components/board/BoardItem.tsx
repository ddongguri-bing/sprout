import { useNavigate } from "react-router";
import images, { mobileIcons } from "../../assets";
import Comments from "./Comments";
import { useState, useEffect, useRef } from "react";
import { createLike, deleteLike, getPostById } from "../../api/board";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Avata from "../common/Avata";

import { useAuthStore } from "../../stores/authStore";
import { postNotification } from "../../api/notification";
import { useModal } from "../../stores/modalStore";
import { useTheme } from "../../stores/themeStore";
import { twMerge } from "tailwind-merge";
import calculateTimeDifference from "../../utils/calculateTimeDifference";
import socials from "../../constants";
import useDebounce from "../../hooks/useDebounce";
import { deletePost } from "../../api/posting";
import { getChannels } from "../../api/channel";

const { Kakao } = window;

interface BoardItemProps {
  isDetail?: boolean;
  post: Omit<PostItem, "channel">;
  channelId: string;
}

export default function BoardItem({
  isDetail,
  post,
  channelId,
}: BoardItemProps) {
  useEffect(() => {
    if (!Kakao.isInitialized()) Kakao.init(socials.KAKAO_JAVASCRIPT_KEY);
  }, []);
  const { createdAt, likes, comments, _id: postId, author } = post;

  const [currentChannelName, setCurrentChannelName] = useState("");
  const isDark = useTheme((state) => state.isDarkMode);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const exactDate = new Date(createdAt).toLocaleString();

  const likeHandlingRef = useRef(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const debouncedIsLike = useDebounce(isLike);

  const [likeId, setLikeId] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState(likes.length);
  const setOpen = useModal((state) => state.setModalOpen);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [commentsCount, setCommentsCount] = useState(comments.length);
  const postImages = JSON.parse(post.title).images;

  const [likeClicked, setLikeClicked] = useState(false);
  const [prevLikeCount, setPrevLikeCount] = useState(likeCount);

  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(postImages.length).fill(false)
  );

  const [showActions, setShowActions] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [modalPosition, setModalPosition] = useState(0);

  const setModalOpen = useModal((state) => state.setModalOpen);

  useEffect(() => {
    if (likeCount > prevLikeCount) {
      setLikeClicked(true);
      setTimeout(() => setLikeClicked(false), 100);
    }
    setPrevLikeCount(likeCount);
  }, [likeCount]);

  const updateCommentCount = (newCount: number) => {
    setCommentsCount(newCount);
  };

  const handleLikeModal = () => {
    setOpen(true, {
      message: "로그인 후 좋아요를 눌러주세요!",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);
        navigate("/auth/signIn");
      },
    });
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
          setIsLike(true);
        } else {
          setLikeId(null);
          setIsLike(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostData();
    Fancybox.bind(`[data-fancybox="gallery-${postId}"]`);
  }, [postId, user]);

  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!isLoggedIn) return handleLikeModal();
    likeHandlingRef.current = true;
    setIsLike((prev) => !prev);
    setLikeCount((prev) => (isLike ? prev - 1 : prev + 1));
  };

  const handleLike = async () => {
    try {
      const response = likeId
        ? await deleteLike(likeId)
        : await createLike(postId);

      const updatedPost = await getPostById(postId);
      setLikeCount(updatedPost.likes.length);
      if (!likeId && response) {
        setLikeId(response._id);
        if (user && user._id !== author._id)
          await postNotification({
            notificationType: "LIKE",
            notificationTypeId: response._id,
            userId: author._id,
            postId,
          });
      } else setLikeId(null);
    } catch (error) {
      console.error(`좋아요 ${likeId ? "취소" : "추가"} 중 오류 발생:`, error);
    }
  };

  useEffect(() => {
    if (!likeHandlingRef.current) return;
    handleLike();
    likeHandlingRef.current = false;
  }, [debouncedIsLike]);

  useEffect(() => {
    const loadImages = () => {
      postImages.forEach((url: string, index: number) => {
        if (!imagesLoaded[index]) {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            setImagesLoaded((prevState) => {
              const updated = [...prevState]; // 기존 상태를 복사
              updated[index] = true; // 해당 인덱스의 값을 true로 설정
              return updated; // 새로운 상태를 반환
            });
          };
        }
      });
    };

    loadImages();
  }, [postImages]); // postImages가 변경될 때마다 다시 실행

  const handleShareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: JSON.parse(post.title).text.replace(/<\/?[^>]+(>|$)/g, ""),
        // description: "des",
        imageUrl: postImages[0] || "",
        link: {
          mobileWebUrl: `${
            import.meta.env.VITE_PUBLIC_URL
          }/board/${channelId}/${postId}`,
          webUrl: `${
            import.meta.env.VITE_PUBLIC_URL
          }/board/${channelId}/${postId}`,
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: `${
              import.meta.env.VITE_PUBLIC_URL
            }/board/${channelId}/${postId}`,
            webUrl: `${
              import.meta.env.VITE_PUBLIC_URL
            }/board/${channelId}/${postId}`,
          },
        },
      ],
    });
  };

  const handleDeletePost = () => {
    setModalOpen(true, {
      message: "정말로 포스트를 삭제하시겠습니까?",
      btnText: "삭제",
      btnColor: "main",
      onClick: async () => {
        if (postId) await deletePost({ postId: postId });
        setModalOpen(false);
        navigate(-1);
      },
    });
  };

  const handleModalOpen = () => {
    setShowActions((prev) => !prev);
  };

  useEffect(() => {
    // 스크롤 막기: 모달이 열릴 때
    if (showActions) {
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫힐 때 원래 상태로 복원
      document.body.style.overflow = "auto";
    }

    //컴포넌트가 언마운트되거나 상태 변경될 때 overflow 초기화
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showActions]);

  // 엘리먼트 위치 추적
  useEffect(() => {
    if (buttonRef.current && showActions) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition(rect.bottom);
    }
  }, [showActions]);

  //채널 이름
  useEffect(() => {
    const getChannelName = async () => {
      const channels = await getChannels();
      const currentChannel = channels.filter(
        (channel) => channel._id === channelId
      );
      setCurrentChannelName(currentChannel[0].name);
    };
    getChannelName();
  }, [channelId]);

  const contentRef = useRef<HTMLDivElement | null>(null);
    // DOM 렌더링 후 Tailwind 스타일을 적용
    useEffect(() => {
      if (contentRef.current) {
        const links = contentRef.current.querySelectorAll("a");
        links.forEach((link) => {
          link.classList.add("text-blue-500", "hover:underline");
        });
      }
    }, [post.title]);

  const mainContents = (
    <div className="w-full max-w-[777px] flex flex-col items-start gap-5">
      <div className="w-full flex justify-between">
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${author._id}`);
          }}
          className="flex gap-[10px] items-center cursor-pointer"
        >
          <Avata profile={author.image} size={"md"} />
          <div>
            <h3 className="font-bold line-clamp-1">{author.fullName}</h3>
            <p className="text-sm text-gray dark:text-whiteDark">
              {author.email}
            </p>
          </div>
        </div>
        {/* 모바일 생성 삭제 버튼 */}
        {user?._id === post?.author._id && isDetail && (
          <button
            type="button"
            className="lg:hidden"
            onClick={handleModalOpen}
            ref={buttonRef}
          >
            <img src={mobileIcons.EllipsisH} className="" alt="" />
          </button>
        )}
        {/* 생성 삭제 모달 */}
        {showActions && (
          <div
            className="fixed top-0 left-0 bottom-0 right-0 bg-transparent flex items-center justify-center z-[9999]"
            onClick={handleModalOpen}
          >
            <div
              className={twMerge(
                "absolute mt-2 w-[120px] bg-white dark:bg-black border border-whiteDark dark:border-gray rounded-md shadow-lg",
                `right-[30px]`
              )}
              style={{ top: `${modalPosition - 30}px` }}
            >
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  navigate(
                    `/board/${channelId}/${postId}/update?name=${currentChannelName}`
                  );
                }}
              >
                수정
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-500 dark:hover:bg-red-800"
                onClick={handleDeletePost}
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full pl-[89px] md:pl-[55px]">
        <div className="w-full max-w-[688px] font-medium md:text-[14px] flex flex-col gap-[10px]">
          {/* 게시물 내용 */}
          <div
            className="whitespace-break-spaces"
            style={{ overflowWrap: "anywhere" }}
            dangerouslySetInnerHTML={{ __html: JSON.parse(post.title).text }}
            ref={contentRef}
          ></div>
          {/* 이미지 */}
          <div
            className={twMerge(
              "w-full grid gap-[10px]",
              postImages.length > 1 ? "grid-cols-2" : ""
            )}
          >
            {postImages.length > 0 &&
              postImages.map((url: string, i: number) => (
                <div key={i}>
                  <a href={postImages[i]} data-fancybox={`gallery-${postId}`}>
                    <div
                      className={twMerge(
                        "w-full bg-whiteDark rounded-[8px] bg-cover bg-center",
                        postImages.length === 1 &&
                          "aspect-[688/450] min-h-[140px]",
                        postImages.length === 2 &&
                          "aspect-[399/450] min-h-[140px]",
                        postImages.length > 2 &&
                          "aspect-[399/300] min-h-[90px]",
                        imagesLoaded[i]
                          ? "opacity-100"
                          : "opacity-0 animate-pulse"
                      )}
                      style={{
                        backgroundImage: imagesLoaded[i]
                          ? `url(${url})`
                          : undefined,
                      }}
                    />
                  </a>
                </div>
              ))}
          </div>
          {/* 하단 컨텐츠 */}
          <div className="flex justify-between mt-[10px] text-sm px-[5px]">
            <div className="flex items-center gap-[30px] md:gap-5">
              <button className="flex items-center gap-[10px]">
                <img
                  src={isDark ? images.darkComment : images.CommentSvg}
                  alt="comment icon"
                  className="dark:block "
                />
                {commentsCount}
              </button>
              <button
                onClick={handleLikeClick}
                className="flex items-center gap-[10px] group "
              >
                <div
                  className={twMerge(
                    "rounded-full p-2 transition duration-100",
                    likeClicked ? "scale-125" : "scale-100"
                  )}
                >
                  <img
                    src={isLike ? images.LikeFill : images.darkLike}
                    alt="like icon dark"
                    className="dark:block hidden min-w-[20px]"
                  />
                  <img
                    src={isLike ? images.LikeFill : images.Like}
                    alt="like icon"
                    className="dark:hidden block min-w-[20px]"
                  />
                </div>
                {likeCount}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareKakao();
                }}
                className={twMerge(
                  "flex items-center gap-[15px] p-2 rounded-full transition-all duration-200 ",
                  isDark ? "hover:bg-gray" : "hover:bg-whiteDark"
                )}
              >
                <img
                  src={isDark ? images.DarkShare : images.Share}
                  className="min-w-[20px]"
                  alt="share icon"
                />
              </button>
            </div>
            <div className="text-gray dark:text-whiteDark relative group md:whitespace-nowrap md:flex md:items-center">
              {calculateTimeDifference(createdAt)}
              <div className="hidden group-hover:block absolute text-xs p-2 rounded-lg -top-[40px] left-1/2 transform -translate-x-1/2 z-10 bg-black text-white whitespace-nowrap dark:bg-whiteDark dark:text-black">
                {exactDate}
              </div>
            </div>
          </div>
          {/* 댓글 */}
          {isDetail && (
            <Comments
              comments={comments}
              postId={postId}
              userId={author._id}
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
    <div
      onClick={(e) => {
        // 클릭 시 페이지 이동을 막고, Fancybox가 열리도록
        const target = e.target as HTMLElement;
        if (!target.closest("[data-fancybox]")) {
          navigate(`/board/${channelId}/${postId}`);
        }
      }}
      className="p-[30px] border-b border-whiteDark dark:border-gray flex flex-col items-center transition-all hover:bg-whiteDark/30 dark:hover:bg-grayDark cursor-pointer"
    >
      {mainContents}
    </div>
  );
}
