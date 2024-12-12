import { Link } from "react-router";
import { Comment } from "../api/board";
import Avata from "./Avata";
import Close from "../assets/close.svg";
interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  console.log(comment);
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
          <p className="text-gray dark:text-whiteDark text-sm">
            {comment.comment}
          </p>
        </div>
      </div>
      <button>
        <img className="dark:invert w-3" src={Close} alt="close icon" />
      </button>
    </div>
  );
}
