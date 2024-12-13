import { useEffect, useState } from "react";
import { useTheme } from "../stores/themeStore";
import { useAuthStore } from "../stores/authStore";
import { getAuthUser } from "../api/auth";
import { CookiesProvider, useCookies } from "react-cookie";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  // 다크모드 고정
  const setIsDarkMode = useTheme((state) => state.setIsDarkMode);
  // auth 상태값 확인
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [cookies, _, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark"); // 처음 페이지 로드 시 'dark' 클래스를 추가
    }
    const { token } = cookies;

    const handleGetUser = async (token: string) => {
      try {
        const user = await getAuthUser(`Bearer ${token}`);
        console.log(user);
        login(token, user);
      } catch (err) {
        logout();
        removeCookie("token");
      }
    };
    console.log("token", token);
    if (token) handleGetUser(token);
    setLoading(false);
  }, []);

  if (loading) return <>Loading...</>;

  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      {children}
    </CookiesProvider>
  );
}
