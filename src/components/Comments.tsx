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
import { postNotification } from "../api/notification";

export default function Comments({
  comments,
  postId,
  userId,
}: {
  comments: Comment[];
  postId: string;
  userId: string;
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
  const handleLineBreak = () => {
    setModalOpts({
      message: "최대 7줄까지만 입력 가능합니다.",
      btnText: "확인",
      isOneBtn: true,
      btnColor: "main",
      onClick: () => {
        setOpen(false);
      },
    });
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const lineCount = (inputValue.match(/[^\n]*\n[^\n]*/gi)?.length ?? 0) + 1;

    if (lineCount > 7) {
      handleLineBreak();
      return;
    }

    setValue(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      if (!isLoggedIn) {
        handleOpenModal();
        return;
      }
      if (value.trim()) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    if (!value.trim()) return;


    try {
      const newComment = await createComment(postId, value);
      if (!newComment) return;
      await postNotification({
        notificationType: "COMMENT",
        notificationTypeId: newComment._id,
        userId,
        postId,
      });
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
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoggedIn) {
            handleOpenModal();
            return;
          }
          handleSubmit();
        }}
        className={twMerge(
          "w-full flex items-start px-5 py-[15px] border border-main rounded-[8px]"
        )}
      >
        <TextareaAutosize
          className="w-full h-6 focus:outline-none  scroll resize-none bg-white dark:bg-black"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={value}
          placeholder="댓글을 입력해주세요"
          maxRows={3}
        />
        <button
          className="mt-[2px] ml-1"
          type="submit"
          disabled={!value.trim()}
        >
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
