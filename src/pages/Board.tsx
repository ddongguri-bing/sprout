import BoardItem from "../components/BoardItem";
import Button from "../components/Button";

export default function Board() {
  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black border-b border-whiteDark dark:border-gray">
        <h2 className="text-xl font-bold">고양이 사진첩</h2>
        <Button to={`/board/id/create`} text="포스트 작성" size={"sm"} />
      </div>
      <BoardItem />
      <BoardItem />
      <BoardItem />
      <BoardItem />
      <BoardItem />
      <BoardItem />
    </div>
  );
}
