import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import { postSignIn, postSignUp } from "../api/auth";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { useCookies } from "react-cookie";
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = `http://localhost:5173/auth/oauth/kakao`;

export default function KakaoRedirect() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [_, setCookie] = useCookies(["token"]);

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const code = new URL(document.location.toString()).searchParams.get(
        "code"
      );
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: KAKAO_REST_API_KEY,
          redirect_uri: KAKAO_REDIRECT_URI,
          code,
        },
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      const { data: user } = await axios.get(
        `https://kapi.kakao.com/v2/user/me`,
        {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    // 1. 회원가입
    const handleSignUp = async () => {
      return await postSignUp({
        email: `${user.id}@k.kakao.net`,
        fullName: user.properties.nickname,
        password: user.connected_at,
      });
    };
    handleSignUp();
    // 2. 회원가입이 되어있거나 회원가입 후 로그인
    const handleSignIn = async () => {
      const data = await postSignIn({
        email: `${user.id}@k.kakao.net`,
        password: user.connected_at,
      });
      if (data) {
        login(data.token, data.user, true);
        setCookie("token", data.token);
        navigate("/");
      }
    };
    setTimeout(() => {
      handleSignIn();
    }, 1500);
  }, [user]);
  return <Loading />;
}
