import { axiosInstance } from ".";

// 사용자 목록
export const getUsers = async () => {
  const { data } = await axiosInstance.get(`/users/get-users`);
  return data;
};

// (특정) 사용자 정보
export const getSpecificUser = async (id: string) => {
  const { data } = await axiosInstance.get(`/users/${id}`);
  return data;
};

// 사용자 프로필 이미지 변경
export const postUploadPhoto = async (body: {
  isCover: boolean;
  image: File;
}) => {
  const formData = new FormData();
  formData.append("isCover", "false");
  formData.append("image", body.image);

  const { data } = await axiosInstance.post(`/users/upload-photo`, formData, {
    headers: {
      Authorization: `Bearer `, // 로그인 후에 작업
    },
  });
  return data;
};

// 사용자 비밀번호 변경
export const putUpdatePw = async (password: string) => {
  const { data } = await axiosInstance.put(
    `/settings/update-password`,
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer `, // 로그인 후에 작업
      },
    }
  );
  return data;
};
