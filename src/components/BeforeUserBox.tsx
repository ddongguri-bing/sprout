import { Link } from "react-router";

export default function BeforeUserBox() {
  return (
    <div className="w-full flex flex-col text-black">
      <h2 className="font-bold mb-[10px]">프로필</h2>
      <p className="text-sm text-gray mb-[30px]">로그인 후 이용해주세요!</p>
      <div className="flex flex-col gap-[10px]">
        <Link
          to={"/auth/signIn"}
          className="w-full h-[42px] flex items-center justify-center bg-main text-[12px] font-medium rounded-[8px]"
        >
          로그인 하기
        </Link>
        <Link
          to={"/auth/signUp"}
          className="w-full h-[42px] flex items-center justify-center bg-main text-[12px] font-medium rounded-[8px]"
        >
          회원가입 하기
        </Link>
      </div>
    </div>
  );
}
