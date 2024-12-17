import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import { postSignIn, postSignUp } from "../api/auth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
const NAVER_REST_API_KEY = import.meta.env.VITE_NAVER_REST_API_KEY;
const NAVER_REDIRECT_URI = `http://localhost:5173/auth/oauth/naver`;
const { naver }: any = window;

export default function NaverRedirect() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [_, setCookie] = useCookies(["token"]);

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const initializeNaverLogin = async () => {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: NAVER_REST_API_KEY,
        callbackUrl: NAVER_REDIRECT_URI,
        isPopup: false,
        callbackHandle: true,
      });
      naverLogin.init();

      naverLogin.getLoginStatus(async function (status: any) {
        if (status) {
          let email = naverLogin.user.getEmail();
          if (email === undefined || email === null) {
            alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
            naverLogin.reprompt();
            return;
          }
          const { user } = naverLogin;
          setUser(user);
        } else {
          console.error("로그인 실패");
        }
      });
    };
    initializeNaverLogin();
  }, []);

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
    // 2.  로그인 = 회원가입이 되어있거나 회원가입 후
    const handleSignIn = async () => {
      const data = await postSignIn({ email: user.email, password: user.id });
      if (data) {
        login(data.token, data.user, true);
        setCookie("token", data.token);
        navigate("/");
      }
    };
    setTimeout(() => {
      handleSignIn();
    }, 800);
    // 3. if 프로필 이미지 있으면 변경
    // 할려고 했는데 프로필 이미지 변경 시 File 타입이 필요한데 소셜로그인은 string url 내려줌
  }, [user]);
  return <Loading />;
}
