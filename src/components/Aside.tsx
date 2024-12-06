import BeforeUserBox from "./BeforeUserBox";
import UserItem from "./UserItem";
import AfterUserBox from "./AfterUserBox";
import NotiItem from "./NotiItem";

interface Props {
  toggleOpen: () => void;
}

export default function Aside({ toggleOpen }: Props) {
  const isLoggedIn = false;
  return (
    <aside className="w-[257px] max-h-screen h-screen sticky top-0 right-0 border-l border-whiteDark pt-[22px] pb-[17px] px-[32px] text-black flex flex-col justify-between">
      {/* 상단 로그인/알림 박스 */}
      {isLoggedIn ? (
        <div className="flex flex-col gap-5">
          <AfterUserBox />
          <div>
            <h2 className="font-bold mb-5">알림</h2>
            <div className="flex-1 max-h-[20vh] overflow-y-auto ">
              <ul className="flex flex-col gap-[15px] text-xs">
                <NotiItem active={true} />
                <NotiItem active={true} />
                <NotiItem active={true} />
                <NotiItem active={false} />
                <NotiItem active={false} />
                <NotiItem active={false} />
                <NotiItem active={false} />
                <NotiItem active={false} />
                <NotiItem active={false} />
                <NotiItem active={false} />
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <BeforeUserBox />
      )}

      {/* 사용자 리스트 및 고정된 링크 */}
      <div className="flex flex-col flex-[3] h-[20%] border-t border-whiteDark overflow-hidden mt-5 scroll">
        <h2 className="font-bold mb-5 pt-5">사용자</h2>
        <div className="flex-1 overflow-y-auto mb-[10px]">
          <ul className="flex flex-col gap-5 ">
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
          </ul>
        </div>
        {/* 하단 고정 링크 */}
        <button
          onClick={toggleOpen}
          className="w-full h-[42px] flex items-center justify-center bg-main text-[12px] font-medium rounded-[8px] mt-[10px]"
        >
          더보기
        </button>
      </div>
    </aside>
  );
}
