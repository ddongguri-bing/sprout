import { Link, NavLink } from "react-router";
import Logo from "../assets/logo.svg";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className="w-[257px] max-h-screen h-screen sticky top-0 left-0 border-r border-whiteDark dark:border-gray py-[21px] px-[32px] flex flex-col items-start">
      <h1 className="mb-[50px]">
        <Link to={"/"}>
          <img className="w-[188px]" src={Logo} alt="main logo" />
        </Link>
      </h1>
      <SearchBar />
      <h2 className="font-bold mb-[20px]">게시판 목록</h2>
      <nav className="flex-1 flex-grow max-h-[calc(100vh-296px)] scroll overflow-y-auto">
        <ul className="flex flex-col gap-5">
          <li>
            <NavLink to="/board/1">고양이 사진첩</NavLink>
          </li>
          <li>
            <NavLink to="/board/2">강아지 사진첩</NavLink>
          </li>
          <li>
            <NavLink to="/board/3">눈 풍경 사진첩</NavLink>
          </li>
          <li>
            <NavLink to="/board/4">거북이 사진첩</NavLink>
          </li>
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}
