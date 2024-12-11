import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Back from "../assets/back.svg";
import BoardItem from "../components/BoardItem";
import Button from "../components/Button";

import { getPostById, PostItem, Comment } from "../api/board";
import { deletePost } from "../api/posting";
import Modal from "../components/Modal";
import { useModal } from "../stores/modalStore";

export default function BoardDetail() {
  const { postId, id } = useParams();
  console.log(id);
  const [post, setPost] = useState<PostItem | null>(null);
  const navigate = useNavigate();

  const modalOpen = useModal((state) => state.modalOpen);
  const setModalOpen = useModal((state) => state.setModalOpen);
  const setModalOpts = useModal((state) => state.setModalOpts);

  const handleDeletePost = () => {
    setModalOpen(true);
    setModalOpts({
      message: "정말로 포스트를 삭제하시겠습니까?",
      btnText: "삭제",
      btnColor: "main",
      onClick: async () => {
        if (postId) await deletePost({ postId: postId });
        setModalOpen(false);
        navigate(-1);
      },
    });
  };

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
    <>
      {modalOpen && <Modal />}
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
            <Button
              theme="sub"
              size="sm"
              text="삭제"
              onClick={handleDeletePost}
            />
            <Button
              to={`/board/${id}/${postId}/update`}
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
            userId: post.author._id,
          }}
          createdAt={post.createdAt}
          postId={post._id}
          channelId={id!}
        />
      </div>
    </>
  );
}
