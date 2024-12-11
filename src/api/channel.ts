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

export const getChannels = async () => {
  return (await axiosInstance.get("/channels")).data;
};

export const getChannelByName = async (name: string) => {
  return (await axiosInstance.get(`/channels/${name}`)).data;
};

//** ADMIN ONLY */
export const postChannelCreate = async (body: {
  authRequired: boolean;
  description: string;
  name: string;
}) => {
  return (await axiosInstance.post(`/channels/create`, body)).data;
};
