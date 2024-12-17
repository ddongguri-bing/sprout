import { AxiosResponse } from "axios";
import { axiosInstance } from ".";

export type postMessage = {
  message: string;
  createdAt: string;
  _id: string;
  seen: boolean;
  receiver: {
    fullName: string;
    _id: string;
  };
  sender: {
    fullName: string;
    _id: string;
  };
};

export type getMessageList = {
  message: string;
  createdAt: string;
  _id: string;
  sender: {
    _id: string;
    fullName: string;
  };
  receiver: {
    _id: string;
    fullName: string;
  };
}[];

export type getChatList = {
  message: string;
  createdAt: string;
  sender: {
    _id: string;
    fullName: string;
  };
  receiver: {
    _id: string;
    fullName: string;
  };
}[];

export type putUpdateSeen = {
  _id: string;
  message: string;
  sender: string;
  receiver: string;
  seen: true;
  createdAt: string;
  updatedAt: string;
}[];

export const postMessage = async (body: {
  message: string;
  receiver: string;
}): Promise<AxiosResponse<postMessage>> => {
  try {
    return await axiosInstance.post("/messages/create", body);
  } catch (error) {
    throw new Error(`메시지 전송 실패! ${error}`);
  }
};

export const getMessageList = async (): Promise<
  AxiosResponse<getMessageList>
> => {
  try {
    return await axiosInstance.get("/messages/conversations");
  } catch (error) {
    throw new Error(`메시지 수신 실패! ${error}`);
  }
};

export const getChatList = async ({
  id,
}: {
  id: string;
}): Promise<AxiosResponse<getChatList>> => {
  try {
    return await axiosInstance.get(`/messages`, {
      params: { userId: id },
    });
  } catch (error) {
    throw new Error(`채팅창 불러오기 실패! ${error}`);
  }
};

export const putUpdateSeen = async (sender: {
  _id: string;
  message: string;
  sender: string;
  receiver: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}) => {
  return await axiosInstance.put("/messages/update-seen", {
    sender,
  });
};
