import { Link } from "react-router";
import { Comment } from "../../api/board";
import Avata from "../common/Avata";
import images from "../../constants/images";
import { useModal } from "../../stores/modalStore";
import { useAuthStore } from "../../stores/authStore";
interface CommentItemProps {
  comment: Comment;
  onDeleteComment: (commentId: string) => void;
}

export default function CommentItem({
  comment,
  onDeleteComment,
}: CommentItemProps) {
  const setOpen = useModal((state) => state.setModalOpen);
  const auth = useAuthStore((state) => state.user);

  const handleDeleteOpen = () => {
    setOpen(true, {
      message: "정말로 댓글을 삭제하시겠습니까?",
      btnText: "삭제",
      btnColor: "red",
      onClick: () => {
        onDeleteComment(comment._id);
        setOpen(false);
      },
    });
  };

  return (
    <div className="flex items-start justify-between gap-[10px]">
      <div className="flex gap-[10px] items-start">
        <Link to={`/user/${comment.author._id}`}>
          <Avata profile={comment.author.image} size={"sm"} />
        </Link>
        <div>
          <Link to={`/user/${comment.author._id}`}>
            <h3 className="font-bold line-clamp-1 text-xs">
              {comment.author.fullName}
            </h3>
          </Link>
          <p className="text-gray dark:text-whiteDark text-sm whitespace-pre-line">
            {comment.comment}
          </p>
        </div>
      </div>

      {auth?._id === comment.author._id && (
        <button onClick={handleDeleteOpen}>
          <img
            className="dark:invert w-3"
            src={images.Close}
            alt="close icon"
          />
        </button>
      )}
    </div>
  );
}
