import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

type ButtonPtops = {
  text: string;
  size: "sm" | "md" | "lg";
  type?: "submit" | "button";
  theme?: "main" | "sub";
  to?: string;
} & React.ComponentPropsWithoutRef<"button">;

export default function Button({
  text,
  size,
  type = "button",
  theme = "main",
  to,
  className,
  ...rest
}: ButtonPtops) {
  const BASE_STYLE =
    "rounded-[8px] flex items-center justify-center transition-all";

  const SIZE_STYLE = {
    lg: "h-[76px] text-[20px] font-bold",
    md: "w-full h-[42px] text-sm font-medium",
    sm: "w-[100px] h-[42px] px-4 text-sm",
  }[size];

  const THEME_STYLE = {
    main: "bg-main text-black hover:bg-hoverMain",
    sub: "border border-main bg-white dark:bg-black hover:bg-whiteDark/30 dark:hover:bg-hoverGray",
  }[theme];

  if (to)
    return (
      <Link
        to={to}
        className={twMerge(BASE_STYLE, SIZE_STYLE, THEME_STYLE, className)}
      >
        {text}
      </Link>
    );
  return (
    <button
      type={type}
      className={twMerge(BASE_STYLE, SIZE_STYLE, THEME_STYLE, className)}
      {...rest}
    >
      {text}
    </button>
  );
}
