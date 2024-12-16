import BoardGridItem from "./BoardGridItem";

interface PostType {
  _id: string;
  channel: string;
  image: string;
  title: string;
}

interface BoardGridProps {
  posts: PostType[];
}

export default function BoardGrid({ posts }: BoardGridProps) {
  if (!posts || posts.length === 0)
    return (
      <div className="py-[10px] border-t border-whiteDark dark:border-gray">
        아직 작성한 포스트가 없습니다
      </div>
    );
  return (
    <div className="py-[10px] border-t border-whiteDark dark:border-gray grid grid-cols-3 gap-2">
      {posts.map((post) => (
        <BoardGridItem key={post._id} post={post} />
      ))}
    </div>
  );
}
