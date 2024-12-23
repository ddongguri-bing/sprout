import BeforeUserBox from "../user/BeforeUserBox";
import UserItem from "../user/UserItem";
import AfterUserBox from "../user/AfterUserBox";
import Button from "../common/Button";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useState } from "react";
import { getOnlineUsers, getUsers } from "../../api/users";
import UserItemSkeleton from "../common/skeleton/UserItemSkeleton";
import { useTriggerStore } from "../../stores/triggerStore";
import { useUserStore } from "../../stores/userStore";

interface AsideProps {
  toggleOpen: () => void;
}

export default function Aside({ toggleOpen }: AsideProps) {
  //스토어에서 로그인 상태 반영
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const trigger = useTriggerStore((state) => state.trigger);
  const setTrigger = useTriggerStore((state) => state.setTrigger);
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        setLoading(true);
        const [data, online] = await Promise.all([
          getUsers(),
          getOnlineUsers(),
        ]);

        const userIds = new Set<string>();
        online.forEach((user) => userIds.add(user._id));

        setUsers(
          [...online, ...data.filter((user) => !userIds.has(user._id))].slice(
            0,
            10
          )
        );
        setOnlineUsers(online);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    handleGetUsers();
  }, [user, trigger]);

  const handleClick = () => {
    toggleOpen();
    setTrigger(!trigger);
  };

  return (
    <aside className="w-[257px] max-h-screen h-screen sticky top-0 right-0 bg-white dark:bg-black border-l border-whiteDark dark:border-gray pt-[22px] pb-[17px] px-[24px] text-black dark:text-white flex flex-col justify-between md:hidden">
      {/* 상단 로그인/알림 박스 */}
      {isLoggedIn && user ? <AfterUserBox user={user} /> : <BeforeUserBox />}

      {/* 사용자 리스트 및 고정된 링크 */}
      <div className="flex flex-col flex-[3] h-[20%] border-t border-whiteDark dark:border-gray text-black dark:text-white overflow-hidden mt-5 scroll">
        <h2 className="font-bold mb-5 pt-5">사용자</h2>
        <div className="flex-1 scroll overflow-y-auto overflow-x-hidden mb-[10px]">
          {loading ? (
            <div className="w-full text-lg font-bold h-[450px] flex flex-col gap-5">
              {Array(10)
                .fill(0)
                .map((_, idx) => (
                  <UserItemSkeleton key={`search-user-${idx}`} />
                ))}
            </div>
          ) : (
            <ul className="flex flex-col gap-[12px]">
              {users.length ? (
                <>
                  {users.map((user) => (
                    <UserItem key={user._id} user={user} />
                  ))}
                </>
              ) : (
                <li>사용자가 존재하지 않습니다</li>
              )}
            </ul>
          )}
        </div>
        {/* 하단 고정 링크 */}
        <Button onClick={handleClick} text={"더보기"} size={"md"} />
      </div>
    </aside>
  );
}
