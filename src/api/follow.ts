import { axiosInstance } from ".";
import { useAuthStore } from "../stores/authStore";

// 팔로우 맺기
export const postFollowCreate = async (userId: string) => {
  const token = useAuthStore.getState().token;
  const { data } = await axiosInstance.post(
    `/follow/create`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// 팔로우 취소
export const deleteFollowDelete = async (id: string) => {
  const { data } = await axiosInstance.delete(`/follow/delete`, {
    data: { id },
  });
  return data;
};
