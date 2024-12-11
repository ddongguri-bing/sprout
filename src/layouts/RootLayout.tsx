import { useEffect } from "react";
import { useTheme } from "../stores/themeStore";
import { useAuthStore } from "../stores/authStore";
import { getAuthUser } from "../api/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setIsDarkMode = useTheme((state) => state.setIsDarkMode);
  // 다크모드 고정
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark"); // 처음 페이지 로드 시 'dark' 클래스를 추가
    }
  }, []);

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const token = document.cookie.match(/token=([^ ]+)/)?.[1];
    const handleGetUser = async (token: string) => {
      try {
        const user = await getAuthUser(`Bearer ${token}`);
        login(token, user);
      } catch (err) {
        logout();
      }
    };
    if (token) handleGetUser(token);
  }, []);

  return <>{children}</>;
}
