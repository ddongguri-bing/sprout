import React from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

type ButtonPtops = {
  text: string;
  size: "sm" | "md" | "lg";
  type?: "submit" | "button";
  theme?: "main" | "sub";
  to?: string;
} & React.ComponentPropsWithoutRef<"button">;

export default React.memo(function Button({
  text,
  size,
  type = "button",
  theme = "main",
  to,
  className,
  onClick,
  ...rest
}: ButtonPtops) {
  const navigate = useNavigate();
  const BASE_STYLE =
    "rounded-[8px] flex items-center justify-center transition-all";

  const SIZE_STYLE = {
    lg: "h-[76px] text-[20px] font-bold md:[60px]",
    md: "w-full h-[42px] text-sm font-medium",
    sm: "w-[100px] h-[42px] px-4 text-sm",
  }[size];

  const THEME_STYLE = {
    main: "bg-main text-black hover:bg-hoverMain",
    sub: "border border-main bg-white dark:bg-black hover:bg-whiteDark/30 dark:hover:bg-hoverGray",
  }[theme];

  return (
    <button
      type={type}
      className={twMerge(BASE_STYLE, SIZE_STYLE, THEME_STYLE, className)}
      onClick={(e) => (to ? navigate(to) : onClick && onClick(e))}
      {...rest}
    >
      {text}
    </button>
  );
});
