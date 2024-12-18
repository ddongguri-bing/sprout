import { axiosInstance } from ".";

export const getChannels = async (): Promise<ChannelItem[]> => {
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

export const deleteCannelDelete = async (channelId: string) => {
  return (
    await axiosInstance.delete(`/channels/delete`, {
      data: { id: channelId },
    })
  ).data;
};
