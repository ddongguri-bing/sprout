import { axiosInstance } from ".";

// 사용자 목록
export const getUsers = async (params?: { [key: string]: string }) => {
  return (await axiosInstance.get(`/users/get-users`, { params })).data;
};

// 사용자 목록
export const getOnlineUsers = async () => {
  return (await axiosInstance.get(`users/online-users`)).data;
};

// (특정) 사용자 정보
export const getSpecificUser = async (id: string): Promise<User> => {
  return (await axiosInstance.get(`/users/${id}`)).data;
};

// 사용자 프로필 이미지 변경
export const postUploadPhoto = async (body: {
  isCover: boolean;
  image: File;
}) => {
  const formData = new FormData();
  formData.append("isCover", "false");
  formData.append("image", body.image);

  return (await axiosInstance.post(`/users/upload-photo`, formData)).data;
};

// 사용자 비밀번호 변경
export const putUpdatePw = async (password: string) => {
  return (
    await axiosInstance.put(`/settings/update-password`, {
      password,
    })
  ).data;
};
