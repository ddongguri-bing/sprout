import { NavLink, useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { mobileIcons } from "../../assets";
import { useAuthStore } from "../../stores/authStore";
import Avata from "../common/Avata";
import { useTheme } from "../../stores/themeStore";
import { useModal } from "../../stores/modalStore";

interface FooterProps {
  userSearchOpen: boolean;
  toggleUserSearch: () => void;
  notiOpen: boolean;
  toggleNotiOpen: () => void;
}

export default function MobileFooter({
  userSearchOpen,
  toggleUserSearch,
  notiOpen,
  toggleNotiOpen,
}: FooterProps) {
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);

  const isDark = useTheme((state) => state.isDarkMode);
  const setOpen = useModal((state) => state.setModalOpen);
  const navigate = useNavigate();

  const handleOpenMsgModal = () => {
    setOpen(true, {
      message: "로그인 후 알림을 확인할 수 있습니다.",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);
        navigate("/auth/signIn");
      },
    });
  };

  return (
    <footer className="bg-white dark:bg-black w-full h-[70px] px-5 fixed bottom-0 left-0 border-t flex items-center justify-center border-whiteDark dark:border-gray lg:hidden">
      <ul
        className={twMerge(
          "w-full max-w-[770px] flex justify-between gap-5 items-center flex-row text-black dark:text-white"
        )}
      >
        <li>
          <NavLink
            to={`/`}
            className={(isActive) => twMerge("text-main", isActive && "active")}
          >
            {({ isActive }) => (
              <img
                src={
                  isActive && !notiOpen && !userSearchOpen
                    ? mobileIcons.HomeSelected
                    : isDark
                    ? mobileIcons.HomeWhite
                    : mobileIcons.Home
                }
                className="w-7"
                alt="home"
              />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/search`} className={twMerge("text-main")}>
            <img
              src={
                pathname.startsWith("/search") && !notiOpen && !userSearchOpen
                  ? mobileIcons.SearchFooterSelected
                  : isDark
                  ? mobileIcons.SearchFooterWhite
                  : mobileIcons.SearchFooter
              }
              className="w-7"
              alt="search"
            />
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => (user ? toggleNotiOpen() : handleOpenMsgModal())}
          >
            <img
              src={
                notiOpen
                  ? mobileIcons.BellSelected
                  : isDark
                  ? mobileIcons.BellWhite
                  : mobileIcons.Bell
              }
              className="w-7"
              alt="search"
            />
          </button>
        </li>
        <li>
          <button onClick={toggleUserSearch}>
            <img
              src={
                userSearchOpen
                  ? mobileIcons.UsersSelected
                  : isDark
                  ? mobileIcons.UsersWhite
                  : mobileIcons.Users
              }
              className={twMerge("w-7", userSearchOpen && "fill-main")}
              alt="search"
            />
          </button>
        </li>
        <li>
          <NavLink
            to={user ? `/user/${user._id}` : "/auth/signIn"}
            className={twMerge("text-main")}
          >
            {user ? (
              <Avata profile={user.image} size={"sm"} />
            ) : (
              <img
                src={isDark ? mobileIcons.UserInfoWhite : mobileIcons.UserInfo}
                className="w-7"
                alt="search"
              />
            )}
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}
