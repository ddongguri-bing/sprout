import { axiosInstance } from ".";

export const getSearchPosts = async (query?: string) => {
  return await axiosInstance.get(`/search/all/${query}`);
};

export const getSearchUsers = async (query?: string) => {
  return await axiosInstance.get(`/search/users/${query}`);
};
