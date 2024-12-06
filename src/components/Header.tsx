import { Link } from "react-router";
import Logo from "../assets/logo.svg";
import SearchBar from "./SearchBar";
export default function Header() {
  return (
    <header className="w-[257px] max-h-screen sticky top-0 left-0 border-r border-whiteDark py-[21px] px-[32px]">
      <h1 className="mb-[50px]">
        <Link to={"/"}>
          <img className="w-[188px]" src={Logo} alt="main logo" />
        </Link>
      </h1>
      <SearchBar />
      <h2 className="font-bold mb-[20px]">게시판 목록</h2>
      <nav>
        <ul className="flex flex-col gap-5">
          <li>
            <Link to="/board/1">게시판 1</Link>
          </li>
          <li>
            <Link to="/board/2">게시판 2</Link>
          </li>
          <li>
            <Link to="/board/3">게시판 3</Link>
          </li>
          <li>
            <Link to="/board/4">게시판 4</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
