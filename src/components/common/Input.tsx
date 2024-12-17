import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../../stores/themeStore";
import images from "../../constants/images";

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type: "text" | "email" | "number" | "password" | "tel";
  theme?: "auth" | "setting";
};

export default function Input(props: InputProps) {
  const { className, theme, type, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const isDark = useTheme((state) => state.isDarkMode);

  const AUTH_STYLE =
    "w-full py-[26px] px-[30px] border border-main rounded-[8px] focus:outline-none placeholder:text-gray bg-white dark:bg-black text-black dark:text-white dark:placeholder:text-whiteDark";
  const SETTING_STYLE =
    "w-full max-w-[500px] h-[50px] rounded-[8px] border border-whiteDark dark:border-gray bg-white dark:bg-black text-black dark:text-white placeholder:text-gray dark:placeholder:text-whiteDark disabled:text-whiteDark dark:disabled:text-gray px-5";

  const PASSWORD_TOGGLE_STYLE =
    "absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer";

  const handleGetStyle = (theme?: string) => {
    switch (theme) {
      case "auth":
        return AUTH_STYLE;
      case "setting":
        return SETTING_STYLE;
      default:
        return "";
    }
  };

  const getPasswordToggleImage = () => {
    if (showPassword) {
      return isDark ? images.darkEyeOff : images.eyeOff;
    } else {
      return isDark ? images.darkEye : images.eye;
    }
  };

  return (
    <div className="relative">
      <input
        className={twMerge(handleGetStyle(theme), className)}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...rest}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={twMerge(PASSWORD_TOGGLE_STYLE)}
        >
          <img
            src={getPasswordToggleImage()}
            alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            className="w-5 h-5"
          />
        </button>
      )}
    </div>
  );
}
