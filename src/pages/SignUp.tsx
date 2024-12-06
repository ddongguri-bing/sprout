import Button from "../components/Button";
import Input from "../components/Input";

export default function SignUp() {
  return (
    <form className="w-full max-w-[494px] flex flex-col gap-[30px]">
      <Input
        className="h-[76px]"
        type="text"
        name="email"
        placeholder="이메일을 입력해주세요."
      />
      <Input
        className="h-[76px]"
        type="text"
        name="fullName"
        placeholder="이름을 입력해주세요."
      />
      <Input
        className="h-[76px]"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <Input
        className="h-[76px]"
        type="password"
        name="password-confirm"
        placeholder="비밀번호를 확인해주세요."
      />
      <Button type="submit" text="회원가입" />
    </form>
  );
}
