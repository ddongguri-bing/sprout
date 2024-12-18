import { Link } from "react-router";
import Avata from "../common/Avata";
import { useUserStore } from "../../stores/userStore";
import React from "react";

export default React.memo(function UserItem({
  user,
  onClick,
}: {
  user: User;
  onClick?: () => void;
}) {
  const onlineUsers = useUserStore((state) => state.onlineUsers);
  const isOnline = !!onlineUsers.find((ou) => ou._id === user._id);
  return (
    <li className="w-full" onClick={onClick}>
      <Link
        to={`/user/${user._id}`}
        className="flex gap-[10px] items-center p-2 rounded-[8px] transition-all hover:bg-whiteDark/30"
      >
        <div className="relative">
          <Avata profile={user.image} size={"sm"} />
          {isOnline && (
            <span className=" absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-main"></span>
            </span>
          )}
        </div>
        <div className="text-xs  truncate">
          <h3 className="font-bold line-clamp-1 text-black dark:text-white">
            {user.fullName}
          </h3>
          <p className="text-gray dark:text-whiteDark truncate">{user.email}</p>
        </div>
      </Link>
    </li>
  );
});
