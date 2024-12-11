import { twMerge } from "tailwind-merge";
import { NotiType } from "../api/notification";

export default function NotiItem({
  active,
  noti,
}: {
  active: boolean;
  noti: NotiType;
}) {
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

  return (
    <li
      className={twMerge(
        "flex items-center gap-[5px] cursor-pointer p-2 rounded-[8px] hover:bg-whiteDark/30 relative before:block before:w-2 before:h-2 before:rounded-full",
        active ? "before:bg-main" : "before:bg-whiteDark"
      )}
    >
      [{noti.author.fullName}] 님이{" "}
      {handleGetMessage(
        noti.comment ? "comment" : noti.like ? "like" : "follow"
      )}
    </li>
  );
}
