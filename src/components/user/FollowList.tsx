import UserItem from "./UserItem";
import images from "../../assets";
import UserItemSkeleton from "../common/skeleton/UserItemSkeleton";

interface FollowListProps {
  users: User[];
  title: string;
  loading: boolean;
  toggleOpen: () => void;
}

export default function FollowList({
  users,
  title,
  loading,
  toggleOpen,
}: FollowListProps) {
  const itemHeight = 50;
  const maxItems = 10;
  const containerHeight = maxItems * itemHeight;

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0  bg-black/50 flex items-center justify-center z-[9999]">
      <article className="w-[calc(100%-32px)] max-w-[600px] bg-white dark:bg-grayDark pt-5 pb-[30px] rounded-[8px] flex flex-col px-[44px]">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={toggleOpen}>
            <img className="dark:invert" src={images.Close} alt="close icon" />
          </button>
        </div>

        {/* 유저 리스트 */}
        <div
          className=" overflow-y-auto scroll"
          style={{ height: `${containerHeight}px` }}
        >
          {loading ? (
            <div className="w-full text-lg font-bold h-full flex flex-col gap-5 ">
              {Array(maxItems)
                .fill(0)
                .map((_, idx) => (
                  <UserItemSkeleton key={`follow-user-${idx}`} />
                ))}
            </div>
          ) : users.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {users.map((user) => (
                <UserItem key={user._id} user={user} />
              ))}
            </ul>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-gray dark:text-whiteDark">
              {title === "팔로워"
                ? "팔로워가 존재하지 않습니다"
                : "팔로잉이 존재하지 않습니다"}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
