import { Link } from "react-router";
import Avata from "./Avata";

export default function UserItem({ user }: { user: any }) {
  return (
    <li className="w-full">
      <Link
        to={`/user/${user._id}`}
        className="flex gap-[10px] items-center p-2 rounded-[8px] transition-all hover:bg-whiteDark/30"
      >
        <Avata profile={user.image} size={"sm"} />
        <div className="text-xs">
          <h3 className="font-bold line-clamp-1 text-black dark:text-white">
            {user.fullName}
          </h3>
          <p className="text-gray dark:text-whiteDark">{user.email}</p>
        </div>
      </Link>
    </li>
  );
}
