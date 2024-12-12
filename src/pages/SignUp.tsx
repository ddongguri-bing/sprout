import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router";
import { postSignUp } from "../api/auth";

export default function SignUp() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // 이메일, 비밀번호, 비밀번호 확인 올바른지 확인하는 로직
  const isValidEmail = () => {
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegExp.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다");
      return false;
    } else {
      setEmailError("");
    }
    return true;
  };

  const isValidPassword = () => {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegExp.test(password)) {
      setPasswordError("대소문자(영문), 숫자 포함 8자리 이상이어야 합니다");
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  };

  const isConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다");
      return false;
    } else {
      setConfirmPasswordError("");
    }
    return true;
  };

  useEffect(() => {
    isConfirmPassword();
  }, [confirmPassword]);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!isValidEmail() || !isValidPassword() || !isConfirmPassword()) return;
    try {
      setDisabled(true);
      const data = await postSignUp({
        email: email,
        fullName: fullName,
        password: password,
      });

      if (data) {
        console.log("회원가입 성공", data);
        navigate("/auth/SignIn");
      } else {
        console.error("회원가입 실패");
      }
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form className="w-full max-w-[494px] flex flex-col gap-[30px]">
      <div>
        <Input
          className="h-[76px]"
          type="text"
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요."
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <p className="text-red text-xs mt-[10px]">{emailError}</p>
        )}
      </div>
      <Input
        className="h-[76px]"
        type="text"
        name="fullName"
        value={fullName}
        placeholder="이름을 입력해주세요."
        onChange={(e) => setFullName(e.target.value)}
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
        {passwordError && (
          <p className="text-red text-xs mt-[10px]">{passwordError}</p>
        )}
      </div>
      <div>
        <Input
          className="h-[76px]"
          type="password"
          name="password-confirm"
          value={confirmPassword}
          placeholder="비밀번호를 확인해주세요."
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPasswordError && (
          <p className="text-red text-xs mt-[10px]">{confirmPasswordError}</p>
        )}
      </div>
      <Button
        text="회원가입"
        size="lg"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        disabled={disabled}
      />
    </form>
  );
}
