import BoardGrid from "../components/BoardGrid";

export default function User() {
  return (
    <div className="py-[70px] px-[50px] text-black flex flex-col items-center">
      <div className="w-full max-w-[826px]">
        <div className="flex mb-[30px] items-end gap-[30px]">
          <div className="w-[220px] h-[220px] bg-whiteDark rounded-[8px]"></div>
          <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-[22px] font-bold">사용자 이름</h2>
              <p className="text-lg text-gray">test@naver.com</p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex gap-[30px]">
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold">팔로우</span>{" "}
                  <span className="text-gray">100</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold">팔로잉</span>{" "}
                  <span className="text-gray">100</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold">포스트</span>{" "}
                  <span className="text-gray">6</span>
                </div>
              </div>
              <button className="w-full max-w-[188px] h-[42px] flex items-center justify-center bg-main text-[12px] font-medium rounded-[8px]">
                팔로잉
              </button>
            </div>
          </div>
        </div>
        <BoardGrid />
      </div>
    </div>
  );
}
