import { FadeLoader } from "react-spinners";
import { socialIcons } from "../../assets";
import useSocialLogin from "../../hooks/useSocialLogin";

export default function SocialLogin() {
  const { handleKakaoLogin, handleNaverLogin, handleGoogleLogin, loading } =
    useSocialLogin();

  return (
    <>
      {loading && (
        <div className="w-full h-full inset-0 bg-black/50 fixed z-[99999] flex justify-center items-center">
          <FadeLoader
            color="#91C788"
            height={25}
            width={8}
            radius={10}
            margin={20}
          />
        </div>
      )}
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
            onClick={() => handleGoogleLogin()}
          >
            <img className="w-8 h-8 " src={socialIcons[2]} alt="google icon" />
          </button>
        </div>
      </div>
    </>
  );
}
