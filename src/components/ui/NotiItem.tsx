import { twMerge } from "tailwind-merge";
import { NotiType, putNotificationSeen } from "../../api/notification";
import { useNavigate } from "react-router";

export default function NotiItem({
  active,
  noti,
  onClick,
}: {
  active: boolean;
  noti: NotiType;
  onClick?: () => void;
}) {
  const type = noti.comment ? "comment" : noti.like ? "like" : "follow";
  const navigate = useNavigate();

  const handleGetMessage = (type: "comment" | "like" | "follow") => {
    switch (type) {
      case "comment":
        return "댓글을 남겼습니다";
      case "like":
        return "당신의 게시글을 좋아합니다";
      case "follow":
        return "당신을 팔로우 합니다";
    }
  };

  const handleLink = (type: "comment" | "like" | "follow") => {
    switch (type) {
      case "comment":
        return `/board/${noti.comment!.post.channel}/${noti.post}`;
      case "like":
        return `/board/${noti.like!.post.channel}/${noti.post}`;
      case "follow":
        return `/user/${noti.author._id}`;
    }
  };

  const handleClickItem = async (type: "comment" | "like" | "follow") => {
    if (active) await putNotificationSeen({ id: noti._id });
    navigate(handleLink(type));
    if (onClick) onClick();
  };

  return (
    <li>
      <div
        onClick={() => handleClickItem(type)}
        className={
          "flex items-center gap-[5px] p-2 rounded-[8px] hover:bg-whiteDark/30 transition-all relative break-keep cursor-pointer"
        }
      >
        <span className="relative flex h-2 w-2">
          {active && (
            <span className="absolute inline-flex h-full w-full rounded-full animate-ping bg-main/80 opacity-75" />
          )}
          <span
            className={twMerge(
              "relative inline-flex rounded-full h-2 w-2",
              active ? "bg-main" : "bg-whiteDark"
            )}
          ></span>
        </span>
        [{noti.author.fullName}] 님이 {handleGetMessage(type)}
      </div>
    </li>
  );
}
