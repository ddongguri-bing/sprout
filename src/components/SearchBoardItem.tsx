import { useState, useEffect } from "react";
import { getSpecificUser } from "../api/users";
import BoardItem from "./BoardItem";
import BoardItemSkeleton from "./BoardItemSkeleton";

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
      postContent={JSON.parse(post.title).text}
      postImages={JSON.parse(post.title).images}
      likesCount={post.likes.length}
      commentCount={post.comments.length}
      author={{
        username: author.fullName,
        email: author.email,
        userId: author._id,
        image: author.image,
      }}
      createdAt={post.createdAt}
      postId={post._id}
      channelId={post.channel}
    />
  );
}
