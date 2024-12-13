import { Link } from "react-router";
import Sprout from "../assets/sprout.svg";

interface PostType {
  _id: string;
  channel: string;
  image: string;
  title: string;
}

interface BoardGridItemProps {
  post: PostType;
}

export default function BoardGridItem({ post }: BoardGridItemProps) {
  return (
    <Link
      to={`/board/${post.channel}/${post._id}`}
      className="w-[calc(33.3333%-6px)] h-[17.75vw] mb-2 [&:nth-of-type(3n+1)]:mr-2 [&:nth-of-type(3n+2)]:mr-2 max-h-[270px] rounded-[8px] bg-white dark:bg-black inline-block overflow-hidden">
      {!JSON.parse(post.title).images.length ? (
        <div className="w-full h-full flex flex-col justify-center items-center border border-1 rounded-[8px] border-whiteDark dark:border-gray text-[14px] text-gray dark:text-whiteDark">
          <img src={Sprout} />
          <span className="pt-5">이미지가 없는 포스트입니다</span>
          <span>포스트를 눌러</span> 작성한 글을 확인해보세요
        </div>
      ) : (
        <img
          src={JSON.parse(post.title).images[0]}
          className="w-full h-full object-cover"
        />
      )}
    </Link>
  );
}
