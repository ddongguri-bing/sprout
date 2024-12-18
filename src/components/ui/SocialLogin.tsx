import { useEffect, useState } from "react";
import { socialIcons } from "../../assets";
import { useGoogleLogin } from "@react-oauth/google";
import { postSignIn, postSignUp } from "../../api/auth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = `${
  import.meta.env.VITE_PUBLIC_URL
}/auth/oauth/kakao`;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
const NAVER_REST_API_KEY = import.meta.env.VITE_NAVER_REST_API_KEY;
const NAVER_REDIRECT_URI = `${
  import.meta.env.VITE_PUBLIC_URL
}/auth/oauth/naver`;

const { naver } = window;

export default function SocialLogin() {
  // kakao
  const handleKakaoLogin = () => (window.location.href = kakaoURL); //kakaoURL로 이동

  // naver
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_REST_API_KEY,
      callbackUrl: NAVER_REDIRECT_URI,
      loginButton: { color: "green", type: 1, height: "48" },
    });
    naverLogin.init();
  };
  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const handleNaverLogin = () => {
    const naverLoginButton = document.getElementById(
      "naverIdLogin_loginButton"
    );
    if (naverLoginButton) naverLoginButton.click();
  };

  // google
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [_, setCookie] = useCookies(["token"]);

  const [user, setUser] = useState<any>(false);

  const handleGetGoogleUserInfo = async (token: string) => {
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setUser(data);
  };
  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      handleGetGoogleUserInfo(tokenResponse.access_token),
    onError: (err) => alert(`로그인에 실패했습니다. ${err}`),
  });

  useEffect(() => {
    if (!user) return;
    // 1. 회원가입
    const handleSignUp = async () => {
      return await postSignUp({
        email: user.email,
        fullName: user.name,
        password: user.id,
      });
    };
    handleSignUp();
    // 2. 회원가입이 되어있거나 회원가입 후 로그인
    const handleSignIn = async () => {
      const data = await postSignIn({
        email: user.email,
        password: user.id,
      });
      if (data) {
        login(data.token, data.user, true);
        setCookie("token", data.token);
        navigate("/");
      }
    };
    setTimeout(() => {
      handleSignIn();
    }, 800);
  }, [user]);
  return (
    <div className="w-full">
      <div className="w-full text-center mb-5 text-lg font-bold">
        간편 로그인
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <button
          className="w-12 h-12 bg-yellow-400 flex items-center justify-center rounded-lg hover:opacity-80"
          onClick={handleKakaoLogin}
        >
          <img className="w-10 h-10" src={socialIcons[0]} alt="kakao icon" />
        </button>
        <button
          className="w-12 h-12 bg-[#2db400] flex items-center justify-center rounded-lg hover:opacity-80"
          onClick={handleNaverLogin}
        >
          <img
            className="w-6 h-6 invert"
            src={socialIcons[1]}
            alt="naver icon"
          />
        </button>
        <div id="naverIdLogin" className="hidden"></div>
        <button
          className="w-12 h-12 bg-white border border-whiteDark flex items-center justify-center rounded-lg hover:opacity-80"
          onClick={() => handleLogin()}
        >
          <img className="w-8 h-8 " src={socialIcons[2]} alt="google icon" />
        </button>
      </div>
    </div>
  );
}
