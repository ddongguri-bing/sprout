import Profile from "../assets/profileLight.svg";
import ProfileDark from "../assets/profileDark.svg";
import { twMerge } from "tailwind-merge";

export default function Avata({
  profile,
  size,
}: {
  profile?: string;
  size: "sm" | "md" | "lg";
}) {
  const BOX_BASE_STYLE =
    "rounded-[8px] relative border border-whiteDark dark:border-gray overflow-hidden";
  const BOX_SIZE = {
    sm: "w-[50px] h-[50px] min-w-[50px] min-h-[50px]",
    md: "w-[75px] h-[75px] min-w-[75px] min-h-[75px]",
    lg: "w-[220px] h-[220px] min-w-[220px] min-h-[220px]",
  }[size];
  const IMG_BASE_STYLE =
    "object-cover min-h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  return (
    <div className={twMerge(BOX_BASE_STYLE, BOX_SIZE)}>
      {profile ? (
        <img
          src={profile}
          alt="profile image"
          className={twMerge(IMG_BASE_STYLE)}
        />
      ) : (
        <>
          <img
            src={ProfileDark}
            alt="profile image"
            className={twMerge(
              IMG_BASE_STYLE,
              "w-[40%] min-h-0 hidden dark:block"
            )}
          />
          <img
            src={Profile}
            alt="profile image"
            className={twMerge(
              IMG_BASE_STYLE,
              "w-[40%] min-h-0 block dark:hidden"
            )}
          />
        </>
      )}
    </div>
  );
}
