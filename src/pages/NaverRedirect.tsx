import { useEffect } from "react";
import Loading from "../components/common/Loading";
import socials from "../constants";
import useSocialLogin from "../hooks/useSocialLogin";

const { naver } = window;

export default function NaverRedirect() {
  const { setUser } = useSocialLogin(true);

  useEffect(() => {
    const initializeNaverLogin = async () => {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: socials.NAVER_REST_API_KEY,
        callbackUrl: socials.NAVER_REDIRECT_URI,
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
          setUser({
            email: user.email,
            fullName: user.name,
            password: user.id,
          });
        } else {
          console.error("로그인 실패");
        }
      });
    };
    initializeNaverLogin();
  }, []);

  return <Loading />;
}
