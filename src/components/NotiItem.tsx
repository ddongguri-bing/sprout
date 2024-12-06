import { twMerge } from "tailwind-merge";

export default function NotiItem({ active }: { active: boolean }) {
  return (
    <li
      className={twMerge(
        "flex items-center gap-[5px] relative before:block before:w-2 before:h-2 before:rounded-full",
        active ? "before:bg-main" : "before:bg-whiteDark"
      )}
    >
      [이름] 님이 댓글을 남겼습니다
    </li>
  );
}
