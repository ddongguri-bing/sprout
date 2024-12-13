import Button from "../common/Button";

export default function BeforeUserBox() {
  return (
    <div className="w-full flex flex-col text-black dark:text-white">
      <h2 className="font-bold mb-[10px]">프로필</h2>
      <p className="text-sm text-gray dark:text-whiteDark mb-[30px]">
        로그인 후 이용해주세요!
      </p>
      <div className="flex flex-col gap-[10px]">
        <Button to={"/auth/signIn"} text="로그인 하기" size="md" />
        <Button to={"/auth/signUp"} text="회원가입 하기" size="md" />
      </div>
    </div>
  );
}
