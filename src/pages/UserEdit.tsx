import { useNavigate } from "react-router";
import { postLogOut } from "../api/auth";
import Back from "../assets/back.svg";
import Camera from "../assets/camera.svg";
import Logout from "../assets/logout.svg";
import Button from "../components/Button";
import SettingInput from "../components/SettingInput";
import { useAuthStore } from "../stores/authStore";
import { useModal } from "../stores/modalStore";
import { useEffect, useState } from "react";
import { postUploadPhoto, putUpdatePw } from "../api/users";
import Avata from "../components/Avata";

export default function UserEdit() {
  // 이미지 업로드 관련
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPhotoUrl(fileUrl);
      setSelectedFile(file);
    } else {
      console.error("파일이 선택되지 않았습니다");
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      console.error("업로드할 파일이 없습니다");
      return;
    }

    try {
      const data = await postUploadPhoto({
        isCover: false,
        image: selectedFile,
      });
      setPhotoUrl(data.image);
      setPhotoId(data._id);
    } catch (error) {
      console.log("이미지 업로드 실패", error);
    }
  };

  //변경 못하는 정보 반영하기(내 이메일, 이름)
  const email = useAuthStore((state) => state.user?.email);
  const fullName = useAuthStore((state) => state.user?.fullName);

  //비밀번호 수정 관련
  const [updatePassword, setUpdatePassword] = useState("");
  const [confirmUpdatePassword, setConfirmUpdatePassword] = useState("");
  const [updatePasswordError, setUpdatePasswordError] = useState("");
  const [confirmUpdatePasswordError, setConfirmUpdatePasswordError] =
    useState("");
  const defaultPassword = useAuthStore((state) => state.user?.password);

  // 비밀번호조건(대소문자+숫자 8자리 이상) 만족 & 이전 비밀번호와 달라야 함
  const isValidUpdatePassword = () => {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const isValid =
      passwordRegExp.test(updatePassword) && updatePassword !== defaultPassword;

    setUpdatePasswordError(isValid ? "" : "올바른 비밀번호가 아닙니다");
    return isValid;
  };

  const isConfirmUpdatePassword = () => {
    const isValid = confirmUpdatePassword === updatePassword;
    setConfirmUpdatePasswordError(
      isValid ? "" : "비밀번호가 일치하지 않습니다"
    );
    return isValid;
  };

  useEffect(() => {
    isConfirmUpdatePassword();
  }, [confirmUpdatePassword]);

  const handleUpdatePassword = async () => {
    if (!isValidUpdatePassword() || !isConfirmUpdatePassword()) return;
    await putUpdatePw(updatePassword);
  };

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
            onChange={handleSelectPhoto}
          />
          {photoUrl ? (
            <div className="w-[220px] h-[220px] flex flex-col justify-center items-center overflow-hidden rounded-[8px]">
              <img src={photoUrl} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-[220px] h-[220px] bg-whiteDark rounded-[8px]"></div>
          )}
          <span className=" absolute -bottom-[10px] -right-[10px] ">
            <img src={Camera} alt="camera icon" />
          </span>
        </label>
        <div className="w-full flex items-center justify-between gap-5">
          <label htmlFor="">이메일</label>
          <SettingInput type={"text"} value={email || ""} disabled />
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          <label htmlFor="">이름</label>
          <SettingInput type={"text"} value={fullName || ""} disabled />
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          <label htmlFor="">비밀번호</label>
          <div className="flex flex-col w-[500px]">
            <SettingInput
              type={"password"}
              value={updatePassword}
              onChange={(e) => {
                setUpdatePassword(e.target.value);
                isValidUpdatePassword();
              }}
              placeholder="변경할 비밀번호를 입력해주세요"
              className="w-full"
            />
            {updatePasswordError && (
              <p className="text-red text-xs mt-[10px]">
                {updatePasswordError}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-5">
          <label htmlFor="">비밀번호 확인</label>
          <div className="flex flex-col w-[500px]">
            <SettingInput
              type={"password"}
              value={confirmUpdatePassword}
              onChange={(e) => {
                setConfirmUpdatePassword(e.target.value);
                isConfirmUpdatePassword();
              }}
              placeholder="비밀번호를 확인해주세요"
            />
            {confirmUpdatePasswordError && (
              <p className="text-red text-xs mt-[10px]">
                {confirmUpdatePasswordError}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-5">
          <Button
            onClick={() => history.back()}
            text={"취소"}
            size={"sm"}
            theme="sub"
          />
          <Button
            type="submit"
            text={"완료"}
            size={"sm"}
            onClick={async () => {
              handleUpdatePassword();
              handleUploadPhoto();
            }}
          />
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
