import { axiosInstance } from ".";

export const getSearchPosts = async (
  query: string
): Promise<SearchPostItem[]> => {
  return (await axiosInstance.get(`/search/all/${query}`)).data;
};

export const getSearchUsers = async (query: string): Promise<User[]> => {
  return (await axiosInstance.get(`/search/users/${query}`)).data;
};
