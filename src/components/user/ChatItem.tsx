import Avata from "../common/Avata";
import { useUserStore } from "../../stores/userStore";

export default function ChatItem({
  user,
  msg,
  onOpen,
}: {
  user: any;
  msg: string;
  onOpen: () => void;
}) {
  const onlineUsers = useUserStore((state) => state.onlineUsers);
  const isOnline = !!onlineUsers.find((ou) => ou._id === user._id);

  return (
    <>
      <li
        className={`w-full cursor-pointer ${msg ? "cursor-pointer" : ""}`}
        onClick={onOpen}
      >
        <div className="flex gap-[10px] items-center p-2 rounded-[8px] transition-all hover:bg-whiteDark/30">
          <div className="relative">
            <Avata profile={user.image} size={"sm"} />
            {isOnline && (
              <span className=" absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main/80 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-main"></span>
              </span>
            )}
          </div>
          <div className="text-xs  line-clamp-1">
            <h3 className="font-bold line-clamp-1 text-black dark:text-white">
              {user.fullName}
            </h3>
            <p className={"text-gray dark:text-whiteDark"}>{msg}</p>
          </div>
        </div>
      </li>
    </>
  );
}
