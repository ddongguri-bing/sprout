import { axiosInstance } from ".";

export const postSignUp = async (body: {
  email: string;
  fullName: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/signup", body);
    return data;
  } catch (error) {
    console.error("API 요청 오류 발생", error);
    throw new Error("회원가입 실패!");
  }
};

export const postSignIn = async (body: { email: string; password: string }) => {
  try {
    const { data } = await axiosInstance.post("/login", body);
    return data;
  } catch (error) {
    console.error("API 요청 오류 발생", error);
    throw new Error("로그인 실패!");
  }
};

export const postLogOut = async () => {
  const { data } = await axiosInstance.post("/logout");
  return data;
};

export const getAuthUser = async () => {
  const { data } = await axiosInstance.get("/auth-user");
  return data;
};
