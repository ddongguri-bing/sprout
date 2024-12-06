import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

export default function Button({
  text,
  type,
  bgColor = true,
  to,
}: {
  text: string;
  type: "submit" | "button" | "link";
  bgColor?: boolean;
  to?: string;
}) {
  if (type == "link" && to)
    return (
      <Link
        to={to}
        className={twMerge(
          "h-[76px] rounded-[8px] text-[20px] font-bold flex items-center justify-center",
          bgColor ? "bg-main" : "border bg-white border-main"
        )}
      >
        {text}
      </Link>
    );
  return (
    <button
      type={type as "submit" | "button"}
      className={twMerge(
        "h-[76px] rounded-[8px] text-[20px] font-bold",
        bgColor ? "bg-main" : "border bg-white border-main"
      )}
    >
      {text}
    </button>
  );
}
