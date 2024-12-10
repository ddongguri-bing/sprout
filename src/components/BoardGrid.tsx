import BoardGridItem from "./BoardGridItem";

export default function BoardGrid() {
  return (
    <div className="py-[10px] border-t border-whiteDark dark:border-gray">
      <BoardGridItem />
      <BoardGridItem />
      <BoardGridItem />
      <BoardGridItem />
      <BoardGridItem />
      <BoardGridItem />
    </div>
  );
}
