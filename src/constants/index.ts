const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = `${
  import.meta.env.VITE_PUBLIC_URL
}/auth/oauth/kakao`;
const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
const NAVER_REST_API_KEY = import.meta.env.VITE_NAVER_REST_API_KEY;
const NAVER_REDIRECT_URI = `${
  import.meta.env.VITE_PUBLIC_URL
}/auth/oauth/naver`;
const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

const socials = {
  KAKAO_REST_API_KEY,
  KAKAO_REDIRECT_URI,
  KAKAO_JAVASCRIPT_KEY,
  KAKAO_URL,
  NAVER_REST_API_KEY,
  NAVER_REDIRECT_URI,
};

export default socials;
