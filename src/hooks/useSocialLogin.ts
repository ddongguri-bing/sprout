import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import socials from "../constants";
import { useAuthStore } from "../stores/authStore";
import { postSignIn, postSignUp } from "../api/auth";

const { naver } = window;

export default function useSocialLogin(isRedirect?: boolean) {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<SocialUser | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [_, setCookie] = useCookies(["token"]);

  // kakao
  const handleKakaoLogin = () => (window.location.href = socials.KAKAO_URL); //kakaoURL로 이동

  // naver
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: socials.NAVER_REST_API_KEY,
      callbackUrl: socials.NAVER_REDIRECT_URI,
      loginButton: { color: "green", type: 1, height: "48" },
    });
    naverLogin.init();
  };
  useEffect(() => {
    if (!isRedirect) initializeNaverLogin();
  }, []);

  const handleNaverLogin = () => {
    const naverLoginButton = document.getElementById(
      "naverIdLogin_loginButton"
    );
    if (naverLoginButton) naverLoginButton.click();
  };

  // google
  const handleGetGoogleUserInfo = async (token: string) => {
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setUser({
      email: data.email,
      fullName: data.name,
      password: data.id,
    });
  };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      handleGetGoogleUserInfo(tokenResponse.access_token),
    onError: (err) => alert(`로그인에 실패했습니다. ${err}`),
  });

  // 자동 로그인
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    // 1. 회원가입
    const handleSignUp = async () => {
      return await postSignUp(user);
    };
    handleSignUp();

    // 2. 회원가입이 되어있거나 회원가입 후 로그인
    const handleSignIn = async () => {
      try {
        const { email, password } = user;
        const data = await postSignIn({
          email,
          password,
        });
        if (data) {
          login(data.token, data.user, true);
          setCookie("token", data.token);
          navigate("/");
        }
      } catch (err) {
        alert("로그인에 실패했습니다");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      handleSignIn();
      // 회원가입 후 바로 로그인하면 에러나서 텀을 줘야함
    }, 1300);
  }, [user]);

  return {
    handleKakaoLogin,
    handleNaverLogin,
    handleGoogleLogin,
    setUser,
    loading,
  };
}
