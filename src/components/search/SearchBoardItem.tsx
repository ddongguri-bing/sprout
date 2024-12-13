import { useState, useEffect } from "react";
import { getSpecificUser } from "../../api/users";
import BoardItem from "../board/BoardItem";
import BoardItemSkeleton from "../common/skeleton/BoardItemSkeleton";

export default function SearchBoardItem({ post }: { post: any }) {
  const [author, setAuthor] = useState<{
    fullName: string;
    email: string;
    _id: string;
    image?: string;
  } | null>(null);

  useEffect(() => {
    const handleGetAuthor = async () => {
      const data = await getSpecificUser(post.author);
      setAuthor(data);
    };
    handleGetAuthor();
  }, []);
  if (!author) return <BoardItemSkeleton />;
  return (
    <BoardItem
      key={post._id}
      isDetail={false}
      post={{ ...post, author }}
      channelId={post.channel}
    />
  );
}
