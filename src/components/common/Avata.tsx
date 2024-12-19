import { twMerge } from "tailwind-merge";
import { useTheme } from "../../stores/themeStore";
import images from "../../assets";
import { useState } from "react";
import BoardImageSkeleton from "./skeleton/BoardImageSkeleton";

export default function Avata({
  profile,
  size,
  onClick,
}: {
  profile?: string;
  size: "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
}) {
  const isDark = useTheme((state) => state.isDarkMode);
  const BOX_BASE_STYLE =
    "rounded-[8px] relative border border-whiteDark dark:border-gray overflow-hidden";
  const BOX_SIZE = {
    xs: "w-[40px] h-[40px] min-w-[40px] min-h-[40px]",
    sm: "w-[50px] h-[50px] min-w-[50px] min-h-[50px]",
    md: "w-[75px] md:w-[50px] h-[75px] md:h-[50px] min-w-[50px] min-h-[50px] max-w-[75px] max-h-[75px]",
    lg: "w-[220px] md:w-[100px] h-[220px] md:h-[100px] min-w-[100px] min-h-[100px] max-w-[220px] max-h-[220px]",
  }[size];
  const IMG_BASE_STYLE =
    "object-cover min-h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={twMerge(BOX_BASE_STYLE, BOX_SIZE)} onClick={onClick}>
      {profile ? (
        <>
          {!imageLoaded && <BoardImageSkeleton />}
          <img
            src={profile}
            alt="profile image"
            className={twMerge(
              IMG_BASE_STYLE,
              imageLoaded ? "opacity-100 cursor-pointer" : "opacity-0"
            )}
            onLoad={handleImageLoad}
          />
        </>
      ) : (
        <>
          {!imageLoaded && <BoardImageSkeleton />}
          <img
            src={isDark ? images.ProfileDark : images.Profile}
            alt="profile image"
            className={twMerge(
              IMG_BASE_STYLE,
              "w-[40%] min-h-0",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleImageLoad}
          />
        </>
      )}
    </div>
  );
}
