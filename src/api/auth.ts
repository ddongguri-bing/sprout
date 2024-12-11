import { axiosInstance } from ".";

export const postSignUp = async (body: {
  email: string;
  fullName: string;
  password: string;
}) => {
  try {
    return await axiosInstance.post("/signup", body);
  } catch (error) {
    console.error("API 요청 오류 발생", error);
    throw new Error("회원가입 실패!");
  }
};

export const postSignIn = async (body: { email: string; password: string }) => {
  try {
    return await axiosInstance.post("/login", body);
  } catch (error) {
    console.error("API 요청 오류 발생", error);
    throw new Error("로그인 실패!");
  }
};

export const postLogOut = async () => {
  return await axiosInstance.post("/logout");
};

export const getAuthUser = async () => {
  return await axiosInstance.get("/auth-user");
};
