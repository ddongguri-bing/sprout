import { twMerge } from "tailwind-merge";
import { useTheme } from "../../stores/themeStore";

export default function ThemeToggle() {
  const isDarkMode = useTheme((state) => state.isDarkMode);
  const setIsDarkMode = useTheme((state) => state.setIsDarkMode);
  const defaultStyle =
    "relative w-[56px] h-[30px] after:bg-center after:bg-no-repeat after:bg-auto bg-main peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:start-[2px] after:rounded-full after:bg-white after:h-[26px] after:w-[26px] after:transition-all peer-checked:bg-gray";

  const handleToggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark");

    if (checked) localStorage.setItem("theme", "dark");
    else localStorage.setItem("theme", "light");
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={isDarkMode}
        onChange={handleToggleTheme}
      />
      <div
        className={twMerge(
          defaultStyle,
          isDarkMode
            ? "after:bg-[url('/assets/dark.svg')]"
            : "after:bg-[url('/assets/light.svg')]"
        )}
      ></div>
    </label>
  );
}
