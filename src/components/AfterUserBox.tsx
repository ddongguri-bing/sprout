import { Link } from "react-router";
import Setting from "../assets/setting.svg";
import { useState, useEffect, useCallback } from "react";
import {
  NotiType,
  getNotification,
  putNotificationSeen,
} from "../api/notification";
import NotiItem from "./NotiItem";
export default function AfterUserBox() {
  const [trigger, setTrigger] = useState<boolean>(false);
  const [notis, setNotis] = useState<NotiType[]>([]);
  useEffect(() => {
    const handleGetNotis = async () => {
      const data = await getNotification();
      console.log(data);
      setNotis(data);
    };
    handleGetNotis();
  }, [trigger]);

  const handleClickNotiSeen = useCallback(async () => {
    if (!notis.length) return;
    await putNotificationSeen();
    setTrigger((prev) => !prev);
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="pb-5 border-b border-whiteDark dark:border-gray">
        <div className="flex justify-end">
          <Link to={"/user/edit"}>
            <img className="dark:invert" src={Setting} alt="setting icon" />
          </Link>
        </div>
        <Link to="/user/1" className="flex gap-[10px] items-center">
          <div className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-[8px] bg-whiteDark"></div>
          <div>
            <h3 className="text-sm font-bold line-clamp-1 text-black dark:text-white">
              사용자 이름
            </h3>
            <p className="text-xs text-gray dark:text-whiteDark">
              test@naver.com
            </p>
          </div>
        </Link>
      </div>
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-bold">알림</h2>
          <button
            onClick={handleClickNotiSeen}
            className="text-xs hover:underline"
          >
            모두 읽음
          </button>
        </div>
        <div className="flex-1 max-h-[20vh] scroll overflow-y-auto ">
          <ul className="flex flex-col gap-[15px] text-xs">
            {notis.length ? (
              <>
                {notis.map((noti) => (
                  <NotiItem key={noti._id} active={!noti.seen} noti={noti} />
                ))}
              </>
            ) : (
              <li className="text-gray dark:text-whiteDark">
                등록된 알림이 없습니다
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
