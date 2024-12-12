import { useState } from "react";
import CommentItem from "./CommentItem";
import { createComment, deleteComment, Comment } from "../api/board";
import Send from "../assets/send.svg";
import SendActive from "../assets/send_active.svg";
import { twMerge } from "tailwind-merge";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthStore } from "../stores/authStore";
import { useModal } from "../stores/modalStore";
import { useNavigate } from "react-router";

export default function Comments({
  comments,
  postId,
}: {
  comments: Comment[];
  postId: string;
}) {
  const [value, setValue] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setOpen = useModal((state) => state.setModalOpen);
  const setModalOpts = useModal((state) => state.setModalOpts);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setModalOpts({
      message: "로그인 후 댓글을 작성해주세요!",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);

        navigate("/auth/signIn");
      },
    });
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      handleOpenModal();
      return;
    }

    if (!value) return;

    try {
      const newComment = await createComment(postId, value);
      setCommentList((prev) => [...prev, newComment]);
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setCommentList((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 mt-[10px]">
      <form
        onSubmit={handleSubmit}
        className={twMerge(
          "w-full flex items-start px-5 py-[15px] border border-main rounded-[8px]"
        )}
      >
        <TextareaAutosize
          className="w-full h-6 focus:outline-none resize-none bg-white dark:bg-black"
          onChange={handleChange}
          value={value}
          placeholder="댓글을 입력해주세요"
          maxRows={3}
        />
        <button className="mt-[2px]" type="submit" disabled={!value}>
          <img src={value ? SendActive : Send} alt="send icon" />
        </button>
      </form>

      {commentList.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
}
