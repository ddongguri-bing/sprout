import { axiosInstance } from ".";
import { ChannelItem } from "../api/channel";
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

export type LikeType = {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
};

export const getPostsByChannel = async (channelId: string) => {
  return (await axiosInstance.get(`/posts/channel/${channelId}`)).data;
};

export const getPostsByChannelWithPagination = async (
  channelId: string,
  offset: number,
  limit: number
) => {
  return (
    await axiosInstance.get(
      `/posts/channel/${channelId}?offset=${offset}&limit=${limit}`
    )
  ).data;
};

export const getPostsByAuthor = async (authorId: string) => {
  return (await axiosInstance.get(`/posts/author/${authorId}`)).data;
};

export const getPostById = async (postId: string) => {
  return (await axiosInstance.get(`/posts/${postId}`)).data;
};

export const createComment = async (postId: string, comment: string) => {
  return (
    await axiosInstance.post("/comments/create", {
      postId,
      comment,
    })
  ).data;
};

export const deleteComment = async (commentId: string) => {
  return (
    await axiosInstance.delete("/comments/delete", {
      data: { id: commentId },
    })
  ).data;
};

export const createLike = async (postId: string) => {
  return (
    await axiosInstance.post("/likes/create", {
      postId,
    })
  ).data;
};

export const deleteLike = async (id: string) => {
  return (
    await axiosInstance.delete("/likes/delete", {
      data: { id },
    })
  ).data;
};
