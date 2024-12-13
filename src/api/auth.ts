import { axiosInstance } from ".";

export const postSignUp = async (body: {
  email: string;
  fullName: string;
  password: string;
}) => {
  try {
    return (await axiosInstance.post("/signup", body)).data;
  } catch (error) {
    throw new Error(`회원가입 실패! ${error}`);
  }
};

export const postSignIn = async (body: { email: string; password: string }) => {
  try {
    return (await axiosInstance.post("/login", body)).data;
  } catch (error) {
    throw new Error(`로그인 실패! ${error}`);
  }
};

export const postLogOut = async () => {
  return (await axiosInstance.post("/logout")).data;
};

export const getAuthUser = async (Authorization: string) => {
  return (
    await axiosInstance.get("/auth-user", {
      headers: {
        Authorization,
      },
    })
  ).data;
};
