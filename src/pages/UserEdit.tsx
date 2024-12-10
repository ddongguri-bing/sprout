import Back from "../assets/back.svg";
import Camera from "../assets/camera.svg";
import Logout from "../assets/logout.svg";
import SettingInput from "../components/SettingInput";
import { useModal } from "../stores/modalStore";

export default function UserEdit() {
  const setOpen = useModal((state) => state.setModalOpen);
  const setModalOpts = useModal((state) => state.setModalOpts);

  const handleLogoutOpen = () => {
    setOpen(true);
    setModalOpts({
      message: "정말로 로그아웃 하시겠습니까?",
      btnText: "로그아웃",
      btnColor: "red",
      onClick: () => console.log("로그아웃 이벤트"),
    });
  };

  return (
    <>
      <div className="w-full h-[100px] px-[30px] mb-10 sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black dark:text-white border-b border-whiteDark dark:border-gray z-[9]">
        <button onClick={() => history.back()} className="">
          <img className="dark:invert" src={Back} alt="back icon" />
        </button>
      </div>
      <form className="w-full max-w-[777px] mb-[125px] flex flex-col items-center mx-auto gap-[30px]">
        <label className="cursor-pointer relative mb-5">
          <input type="file" name="" id="" hidden />
          <div className="w-[220px] h-[220px] bg-whiteDark rounded-[8px]"></div>
          <span className=" absolute -bottom-[10px] -right-[10px] ">
            <img src={Camera} alt="camera icon" />
          </span>
        </label>
        <div className="w-full flex items-center justify-between gap-5">
          <label htmlFor="">이메일</label>
          <SettingInput
            type={"text"}
            placeholder="test@naver.com"
            value={"test@naver.com"}
            disabled
          />
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          <label htmlFor="">이름</label>
          <SettingInput
            type={"text"}
            placeholder="사용자 이름"
            value={"사용자 이름"}
            disabled
          />
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          <label htmlFor="">비밀번호</label>
          <SettingInput
            type={"password"}
            placeholder="변경할 비밀번호를 입력해주세요"
          />
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          <label htmlFor="">비밀번호 확인</label>
          <SettingInput
            type={"password"}
            placeholder="비밀번호를 확인해주세요"
          />
        </div>
        <div className="w-full flex justify-end items-center gap-5">
          <button
            type="button"
            onClick={() => history.back()}
            className="w-[100px] h-[42px] px-4 flex items-center justify-center bg-whiteDark text-[12px] font-medium rounded-[8px]"
          >
            취소
          </button>
          <button
            type="submit"
            className="w-[100px] h-[42px] px-4 flex items-center justify-center bg-main text-[12px] font-medium rounded-[8px]"
          >
            완료
          </button>
        </div>
      </form>
      <div className="w-full max-w-[777px] mx-auto flex items-end mb-[30px] justify-between gap-5">
        <div className="flex flex-col gap-[5px] text-gray dark:text-whiteDark">
          <div className="font-bold">로그아웃</div>
          <div className="text-xs">
            SPROUT 사이트에서 로그아웃을 원하신다면 로그아웃 버튼을 클릭하세요
          </div>
        </div>
        <button
          aria-label="logout button"
          onClick={handleLogoutOpen}
          className="text-red text-xs font-medium underline flex items-center gap-[10px]"
        >
          로그아웃
          <img src={Logout} alt="logout icon" />
        </button>
      </div>
    </>
  );
}
