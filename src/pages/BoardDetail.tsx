import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Back from "../assets/back.svg";
import BoardItem from "../components/BoardItem";
import Button from "../components/Button";
import { getPostById, PostItem, Comment } from "../api/board";

export default function BoardDetail() {
  const { postId, channelId } = useParams();
  const [post, setPost] = useState<PostItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {
        const postData = await getPostById(postId);
        setPost(postData);
      }
    };

    fetchPostData();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex justify-between items-center dark:text-white bg-white dark:bg-black border-b border-whiteDark dark:border-gray">
        <button onClick={() => navigate(-1)} className="">
          <img
            className="dark:invert dark:hover:fill-white"
            src={Back}
            alt="back icon"
          />
        </button>
        <div className="flex items-center gap-5">
          <Button theme="sub" size="sm" text="삭제" />
          <Button
            to={`/board/${channelId}/${postId}/update`}
            size="sm"
            text="수정"
          />
        </div>
      </div>
      <BoardItem
        isDetail={true}
        comments={(post.comments as unknown as Comment[]) || []}
        postContent={post.title}
        postImages={post.image ? [post.image] : []}
        likesCount={post.likes.length}
        commentCount={post.comments.length}
        author={{
          username: post.author.fullName,
          email: post.author.email,
        }}
        createdAt={post.createdAt}
        postId={post._id}
        channelId={channelId!}
      />
    </div>
  );
}
