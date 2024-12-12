import { twMerge } from "tailwind-merge";
import { NotiType } from "../api/notification";
import { Link } from "react-router";

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

  console.log(noti);
  const type = noti.comment ? "comment" : noti.like ? "like" : "follow";
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

  return (
    <li>
      <Link
        to={handleLink(type)}
        className={twMerge(
          "flex items-center gap-[5px] p-2 rounded-[8px] hover:bg-whiteDark/30 transition-all relative before:block before:w-2 before:h-2 before:rounded-full break-keep",
          active ? "before:bg-main" : "before:bg-whiteDark"
        )}
      >
        [{noti.author.fullName}] 님이 {handleGetMessage(type)}
      </Link>
    </li>
  );
}
