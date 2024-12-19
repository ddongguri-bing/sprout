import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useDebounce from "../../hooks/useDebounce";
import images from "../../assets";
import { twMerge } from "tailwind-merge";

export default function SearchBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const debouncedValue = useDebounce(value);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${value.trim()}`);
  };

  useEffect(() => {
    if (!isTyping) return;
    navigate(`/search?query=${debouncedValue}`, { replace: true });
    setIsTyping(false);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsTyping(true);
  };

  useEffect(() => {
    if (!pathname.startsWith("/search")) setValue("");
  }, [pathname]);

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge("w-full relative md:mb-0 mb-[30px]")}
    >
      <label htmlFor="search" className="absolute top-[15px] left-[15px]">
        <img src={images.Search} alt="search icon" />
      </label>
      <input
        id="search"
        className="w-full border rounded-[8px] border-main pr-[8px] pl-[30px] py-[8px] placeholder:text-sm focus:outline-none placeholder:text-gray dark:placeholder:text-whiteDark bg-white dark:bg-black dark:text-white"
        placeholder="포스트를 검색해 보세요"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
}
