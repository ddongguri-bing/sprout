import Search from "../assets/search.svg";
export default function SearchBar() {
  return (
    <form className="relative mb-[30px]">
      <label htmlFor="search" className="absolute top-[15px] left-[15px]">
        <img src={Search} alt="search icon" />
      </label>
      <input
        id="search"
        className="w-full border rounded-[8px] border-main pr-[8px] pl-[30px] py-[8px] placeholder:text-sm focus:outline-none placeholder:text-gray"
        placeholder="포스트를 검색해 보세요"
      />
    </form>
  );
}
