import { axiosInstance } from ".";
import { ChannelItem } from "../api/channel";
import { useAuthStore } from "../stores/authStore";

export type PostItem = {
  likes: string[];
  comments: Comment[];
  _id: string;
  title: string;
  image?: string;
  imagePublicId?: string;
  channel: ChannelItem;
  author: Author;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Author = {
  _id: string;
  fullName: string;
  email: string;
  image?: string;
};

export type Comment = {
  _id: string;
  comment: string;
  author: Author;
  post: string;
  createdAt: string;
  updatedAt: string;
};

export type Like = {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
};

export const getPostsByChannel = async (channelId: string) => {
  const { data } = await axiosInstance.get(`/posts/channel/${channelId}`);
  return data;
};

export const getPostsByAuthor = async (authorId: string) => {
  const { data } = await axiosInstance.get(`/posts/author/${authorId}`);
  return data;
};

export const getPostById = async (postId: string) => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  return data;
};

export const createComment = async (postId: string, comment: string) => {
  const token = useAuthStore.getState().token;
  const { data } = await axiosInstance.post(
    "/comments/create",
    { postId, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteComment = async (commentId: string) => {
  const token = useAuthStore.getState().token;
  const { data } = await axiosInstance.delete("/comments/delete", {
    data: { id: commentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
