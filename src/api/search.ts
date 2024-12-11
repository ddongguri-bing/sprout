import { axiosInstance } from ".";

export const handleSearchPost = async (query?: string) => {
  return await axiosInstance.get(`/search/all/${query}`);
};
