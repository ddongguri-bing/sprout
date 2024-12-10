import { useEffect } from "react";
import { useTheme } from "../stores/themeStore";

export default function ThemeLayout({
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
  return <>{children}</>;
}
