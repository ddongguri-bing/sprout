import { axiosInstance } from ".";

export type PostItemType = {
  likes: {
    _id: string;
    user: string;
    post: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  comments: string[];
  _id: string;
  title: string;
  channel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const getSearchPosts = async (
  query?: string
): Promise<PostItemType[]> => {
  return (await axiosInstance.get(`/search/all/${query}`)).data;
};

export const getSearchUsers = async (query: string) => {
  return (await axiosInstance.get(`/search/users/${query}`)).data;
};
