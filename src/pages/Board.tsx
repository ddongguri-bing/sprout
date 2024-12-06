import BoardItem from "../components/BoardItem";

export default function Board() {
  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] sticky top-0 left-0 flex justify-center items-center bg-white border-b border-whiteDark">
        <h2 className="w-full max-w-[777px] text-xl font-bold">
          고양이 사진첩
        </h2>
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
