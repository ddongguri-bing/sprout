import { useParams } from "react-router";
import Back from "../assets/back.svg";
import BoardItem from "../components/BoardItem";
import Button from "../components/Button";
import { deletePost } from "../api/posting";

export default function BoardDetail() {
  const params = useParams();
  const currentPostId = params.postId;

  const handleDeletePost = () => {
    deletePost({ postId: "67590127cd6a3632f289c887" });
  };

  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex justify-between items-center dark:text-white bg-white dark:bg-black border-b border-whiteDark dark:border-gray">
        <button onClick={() => history.back()} className="">
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
          <Button to="/board/id/postid/update" size="sm" text="수정" />
        </div>
      </div>
      <BoardItem isDetail={true} comments={[]} />
    </div>
  );
}
