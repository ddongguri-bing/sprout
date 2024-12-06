import Logo from "../assets/logo.svg";
import { Link, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const path = pathname.split("/").pop();
  const title = {
    signIn: "로그인",
    signUp: "회원가입",
  }[path!];

  return (
    <>
      <header className="w-full h-[100px] border-b border-whiteDark bg-white flex items-center justify-center">
        <Link to={"/"}>
          <img src={Logo} alt="main logo" />
        </Link>
      </header>
      <article className="w-full flex py-[162px] justify-center">
        <section className="w-[494px] h-auto flex flex-col items-center gap-[60px]">
          <h1 className="font-bold text-[32px]">{title}</h1>
          <Outlet />
        </section>
      </article>
    </>
  );
}
