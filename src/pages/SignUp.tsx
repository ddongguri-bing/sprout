import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useNavigate } from "react-router";
import { postSignUp } from "../api/auth";
import { validifyPw } from "../utils/validify";
import { useModal } from "../stores/modalStore";

export default function SignUp() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const setModalOpen = useModal((state) => state.setModalOpen);

  const navigate = useNavigate();

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
    const isValidPw = validifyPw(password);

    if (!isValidPw) {
      setPasswordError("대소문자(영문), 숫자 포함 8자리 이상이어야 합니다");
    } else {
      setPasswordError("");
    }

    return isValidPw;
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
        setModalOpen(true, {
          message: "회원가입에 성공했습니다",
          isOneBtn: true,
          btnText: "확인",
          btnColor: "main",
        });
        navigate("/auth/SignIn");
      }
    } catch (err) {
      console.error(err);
      setModalOpen(true, {
        message: "회원가입에 실패했습니다",
        isOneBtn: true,
        btnText: "확인",
        btnColor: "red",
      });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form className="w-full max-w-[494px] flex flex-col gap-[30px]">
      <div>
        <Input
          theme="auth"
          className="h-[76px] md:h-[60px]"
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
        theme="auth"
        className="h-[76px] md:h-[60px]"
        type="text"
        name="fullName"
        value={fullName}
        placeholder="이름을 입력해주세요."
        onChange={(e) => setFullName(e.target.value)}
      />
      <div>
        <Input
          theme="auth"
          className="h-[76px] md:h-[60px]"
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
          theme="auth"
          className="h-[76px] md:h-[60px]"
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
