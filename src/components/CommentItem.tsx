import { Link } from "react-router";
import { Comment } from "../api/board";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-[10px] items-start">
      <Link to={`/user/${comment.author._id}`}>
        <div className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-[8px] bg-whiteDark"></div>
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
  );
}
