import Close from "../assets/close.svg";
import Search from "../assets/search.svg";
import UserItem from "./UserItem";

export default function UserSearch({ toggleOpen }: { toggleOpen: () => void }) {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-[9999]">
      <article className="w-[calc(100%-32px)] max-w-[600px] bg-white pt-5 pb-[30px] rounded-[8px] flex flex-col px-[44px]">
        <div className="flex justify-end mb-5">
          <button onClick={toggleOpen}>
            <img src={Close} alt="close icon" />
          </button>
        </div>
        <form className="relative mb-5">
          <label htmlFor="search" className="absolute top-[18px] left-[15px]">
            <img src={Search} alt="search icon" className="w-[18px] h-[18px]" />
          </label>
          <input
            id="search"
            className="w-full border rounded-[8px] border-main pl-[45px] pr-[30px] py-[15px] placeholder:text-sm focus:outline-none placeholder:text-gray"
            placeholder="사용자를 검색해 보세요"
          />
        </form>
        <div className="flex-1 max-h-[450px] overflow-y-auto">
          <ul className="flex flex-col gap-5">
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
          </ul>
        </div>
      </article>
    </div>
  );
}
