import { axiosInstance } from ".";

// 팔로우 맺기
export const postFollowCreate = async (userId: string) => {
  return (await axiosInstance.post(`/follow/create`, { userId })).data;
};

// 팔로우 취소
export const deleteFollowDelete = async (id: string) => {
  return (
    await axiosInstance.delete(`/follow/delete`, {
      data: { id },
    })
  ).data;
};
