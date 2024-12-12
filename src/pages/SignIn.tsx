import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuthStore } from "../stores/authStore";
import { postSignIn } from "../api/auth";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failLogin, setFailLogin] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      const data = await postSignIn({
        email: email,
        password: password,
      });
      if (data) {
        login(data.token, data.user);
        // 토큰 유효기간 3시간 설정해 쿠키에 저장 (토큰 유효시간 갱신 처리 아직)
        document.cookie = `token=${data.token} path=/; max-age=10800; secure`;
        navigate("/");
        setFailLogin(false);
      }
    } catch {
      console.error("로그인 실패");
      setFailLogin(true);
    }
  };

  return (
    <form className="w-full max-w-[494px] flex flex-col gap-[30px]">
      <Input
        className="h-[76px]"
        type="text"
        name="email"
        value={email}
        placeholder="이메일을 입력해주세요."
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <Input
          className="h-[76px]"
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
        />
        {failLogin && (
          <p className="text-red text-xs mt-[10px]">
            이메일 또는 비밀번호를 다시 확인해주세요.
            <br />
            등록되지 않은 이메일이거나, 이메일 혹은 비밀번호를 잘못
            입력하셨습니다
          </p>
        )}
      </div>
      <Button
        text="로그인"
        size="lg"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      />
      <Button text="회원가입" to="/auth/signUp" size="lg" theme="sub" />
    </form>
  );
}
