import axios from "axios";
import { useEffect } from "react";
import Loading from "../components/common/Loading";
import socials from "../constants";
import useSocialLogin from "../hooks/useSocialLogin";

export default function KakaoRedirect() {
  const { setUser } = useSocialLogin(true);

  useEffect(() => {
    const getUser = async () => {
      const code = new URL(document.location.toString()).searchParams.get(
        "code"
      );
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: socials.KAKAO_REST_API_KEY,
          redirect_uri: socials.KAKAO_REDIRECT_URI,
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
      setUser({
        email: `${user.id}@k.kakao.net`,
        fullName: user.properties.nickname,
        password: user.connected_at,
      });
    };
    getUser();
  }, []);

  return <Loading />;
}
