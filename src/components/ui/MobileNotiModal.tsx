import images from "../../assets";
import { useState, useEffect, useCallback } from "react";
import {
  NotiType,
  getNotification,
  putNotificationSeen,
} from "../../api/notification";
import NotiItem from "../ui/NotiItem";
import { useTriggerStore } from "../../stores/triggerStore";
export default function MobileNotiModal({
  toggleOpen,
}: {
  toggleOpen: () => void;
}) {
  const trigger = useTriggerStore((state) => state.trigger);
  const setTrigger = useTriggerStore((state) => state.setTrigger);
  const [notis, setNotis] = useState<NotiType[]>([]);
  useEffect(() => {
    const handleGetNotis = async () => {
      const data = await getNotification();
      const now = new Date().getTime(); // 현재 시간
      const fiveMinutesInMs = 5 * 60 * 1000; // 5분을 밀리초로 변환
      const filter = data.filter((item) => {
        if (!item.seen) return true; // seen이 false인 경우 유지
        if (item.seen) {
          const updatedAt = new Date(item.updatedAt).getTime();
          return now - updatedAt <= fiveMinutesInMs; // 5분 이내인지 확인
        }
        return false; // 그 외는 필터링
      });
      setNotis(filter);
    };
    handleGetNotis();
  }, [trigger]);

  const handleClickNotiSeen = useCallback(async () => {
    if (!notis.length) return;
    await putNotificationSeen();
    setTrigger();
  }, [notis]);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-[9999]">
      <article className="w-[calc(100%-32px)] max-w-[600px] bg-white dark:bg-grayDark pt-5 pb-[30px] rounded-[8px] flex flex-col md:px-5 px-[44px]">
        <div className="flex justify-between mb-5">
          <div className="flex gap-5 items-center">
            <h2 className="font-bold">알림</h2>
            <button
              onClick={handleClickNotiSeen}
              className="text-xs hover:underline"
            >
              모두 읽음
            </button>
          </div>
          <button onClick={toggleOpen}>
            <img className="dark:invert" src={images.Close} alt="close icon" />
          </button>
        </div>
        <div className="w-full scroll h-[456px] max-h-[456px] overflow-y-auto">
          <ul className="flex flex-col gap-[1px] text-xs">
            {notis.length ? (
              <>
                {notis.map((noti) => (
                  <NotiItem
                    key={noti._id}
                    active={!noti.seen}
                    noti={noti}
                    onClick={toggleOpen}
                  />
                ))}
              </>
            ) : (
              <li className="text-gray dark:text-whiteDark">
                등록된 알림이 없습니다
              </li>
            )}
          </ul>
        </div>
      </article>
    </div>
  );
}
