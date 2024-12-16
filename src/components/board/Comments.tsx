import { useState } from "react";
import CommentItem from "./CommentItem";
import { createComment, deleteComment, Comment } from "../../api/board";
import images from "../../constants/images";
import { twMerge } from "tailwind-merge";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthStore } from "../../stores/authStore";
import { useModal } from "../../stores/modalStore";
import { useNavigate } from "react-router";
import { postNotification } from "../../api/notification";

export default function Comments({
  comments,
  postId,
  userId,
  updateCommentCount,
}: {
  comments: Comment[];
  postId: string;
  userId: string;
  updateCommentCount: (newCount: number) => void;
}) {
  const [value, setValue] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const setOpen = useModal((state) => state.setModalOpen);
  const isModalOpen = useModal((state) => state.modalOpen);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpen(true, {
      message: "로그인 후 댓글을 작성해주세요!",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);
        navigate("/auth/signIn");
      },
    });
  };

  const handleLineBreak = () => {
    setOpen(true, {
      message: "최대 7줄까지만 입력 가능합니다.",
      btnText: "확인",
      isOneBtn: true,
      btnColor: "main",
      onClick: () => {
        setOpen(false);
      },
    });
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
    if (isModalOpen) {
      e.preventDefault();
      return;
    }
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
      if (user && user._id !== userId)
        await postNotification({
          notificationType: "COMMENT",
          notificationTypeId: newComment._id,
          userId,
          postId,
        });
      setCommentList((prev) => [...prev, newComment]);
      updateCommentCount(commentList.length + 1);
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
      updateCommentCount(commentList.length - 1);
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
          <img src={value ? images.SendActive : images.Send} alt="send icon" />
        </button>
      </form>

      {commentList.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onDeleteComment={() => handleDeleteComment(comment._id)}
        />
      ))}
    </div>
  );
}
