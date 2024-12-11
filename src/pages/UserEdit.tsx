import { useNavigate } from "react-router";
import { postLogOut } from "../api/auth";
import Back from "../assets/back.svg";
import Camera from "../assets/camera.svg";
import Logout from "../assets/logout.svg";
import Button from "../components/Button";
import SettingInput from "../components/SettingInput";
import { useAuthStore } from "../stores/authStore";
import { useModal } from "../stores/modalStore";
import { useState } from "react";
import { postUploadPhoto } from "../api/users";

export default function UserEdit() {
  //로그아웃 관련
  const setOpen = useModal((state) => state.setModalOpen);
  const setModalOpts = useModal((state) => state.setModalOpts);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await postLogOut();
    setOpen(false);
    logout();
    document.cookie = `token=`;
    navigate("/");
  };

  const handleLogoutOpen = () => {
    setOpen(true);
    setModalOpts({
      message: "정말로 로그아웃 하시겠습니까?",
      btnText: "로그아웃",
      btnColor: "red",
      onClick: handleLogout,
    });
  };

  // 이미지 업로드 관련
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoId, setPhotoId] = useState("");

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("파일이 선택되지 않았습니다");
      return;
    }

    setSelectedPhoto(file);

    try {
      const data = await postUploadPhoto({
        isCover: false,
        image: file,
      });
      setPhotoUrl(data.image);
      setPhotoId(data._id);
    } catch (error) {
      console.log("이미지 업로드 실패", error);
    }
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
          <input
            type="file"
            accept="image/*"
            id={photoId}
            hidden
            onChange={handleUploadPhoto}
          />
          <div
            className="w-[220px] h-[220px] bg-whiteDark rounded-[8px]"
            style={
              photoUrl
                ? { background: `url(${photoUrl})`, backgroundSize: "cover" }
                : {}
            }
          ></div>
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
          <Button
            onClick={() => history.back()}
            text={"취소"}
            size={"sm"}
            theme="sub"
          />
          <Button type="submit" text={"완료"} size={"sm"} />
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
