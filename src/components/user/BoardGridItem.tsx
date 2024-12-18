import { Link } from "react-router";
import images from "../../assets";
import { useState } from "react";
import BoardImageSkeleton from "../common/skeleton/BoardImageSkeleton";
import { twMerge } from "tailwind-merge";

interface BoardGridItemProps {
  post: PostItem;
}

export default function BoardGridItem({ post }: BoardGridItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      to={`/board/${post.channel}/${post._id}`}
      className="aspect-square min-h-[50px] max-h-[280px] rounded-[8px] bg-white dark:bg-black overflow-hidden"
    >
      {!JSON.parse(post.title).images.length ? (
        <div className="w-full h-full flex flex-col justify-center items-center border border-1 rounded-[8px] border-whiteDark dark:border-gray text-[14px] text-gray dark:text-whiteDark">
          <img src={images.Sprout} />
          <span className="pt-5">이미지가 없는 포스트입니다</span>
          <span>포스트를 눌러</span> 작성한 글을 확인해보세요
        </div>
      ) : (
        <>
          {!imageLoaded && <BoardImageSkeleton />}
          <img
            src={JSON.parse(post.title).images[0]}
            className={twMerge(
              "w-full h-full object-cover ",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleImageLoad}
          />
        </>
      )}
    </Link>
  );
}
