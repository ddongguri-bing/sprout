import Back from "../assets/back.svg";
import BoardItem from "../components/BoardItem";

export default function BoardDetail() {
  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex items-center bg-white border-b border-whiteDark">
        <div className="w-full max-w-[777px]">
          <button onClick={() => history.back()} className="">
            <img src={Back} alt="back icon" />
          </button>
        </div>
      </div>
      <BoardItem isDetail={true} comments={[]} />
    </div>
  );
}
