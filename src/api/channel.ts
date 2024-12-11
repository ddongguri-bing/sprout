import { axiosInstance } from ".";

export type ChannelItem = {
  authRequired: boolean;
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string; //"2024-12-10T10:41:56.950Z"
  updatedAt: string;
  __v: number;
};

export const handleGetChannels = async () => {
  return await axiosInstance.get("/channels");
};
