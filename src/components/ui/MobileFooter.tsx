import { NavLink, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { mobileIcons } from "../../assets";
import { useAuthStore } from "../../stores/authStore";

interface FooterProps {
  toggleOpen: () => void;
}

export default function MobileFooter({ toggleOpen }: FooterProps) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <footer className="bg-white w-full h-[80px] fixed bottom-0 left-0 border-t border-whiteDark lg:hidden">
      <ul
        className={twMerge(
          "w-full flex flex-col justify-around mt-3",
          "md:flex-row"
        )}
      >
        <li>
          <NavLink
            to={`/`}
            className={(isActive) =>
              twMerge("font-bold text-main", isActive ? "active" : "")
            }
          >
            {({ isActive }) => (
              <img
                src={isActive ? mobileIcons.HomeSelected : mobileIcons.Home}
                alt="home"
              />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/search?query=수코딩`}
            className={twMerge("font-bold text-main")}
          >
            <img
              src={mobileIcons.SearchFooter}
              className="w-[30px]"
              alt="search"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to={`/`} className={twMerge("font-bold text-main")}>
            <img src={mobileIcons.Bell} className="w-[30px]" alt="noti icon" />
          </NavLink>
        </li>
        <li>
          <button onClick={toggleOpen}>
            <img
              src={mobileIcons.Users}
              className="w-[30px]"
              alt="users icon"
            />
          </button>
        </li>
        <li>
          {user && (
            <NavLink
              to={`/user/${user._id}`}
              className={twMerge("font-bold text-main")}
            >
              <img
                src={mobileIcons.UserInfo}
                className="w-[30px]"
                alt="user-info-icon"
              />
            </NavLink>
          )}
          {!user && (
            <button type="button" onClick={() => navigate("/auth/signIn")}>
              <img
                src={mobileIcons.UserInfo}
                className="w-[30px]"
                alt="user-info-icon"
              />
            </button>
          )}
        </li>
      </ul>
    </footer>
  );
}
