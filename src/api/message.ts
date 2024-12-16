import { AxiosResponse } from "axios";
import { axiosInstance } from ".";

export type postMessage = {
  message: string;
  receiver: {
    fullName: string;
    createdAt: string;
    _id: string;
  };
};

export type getMessage = {
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

export const getMessage = async (): Promise<AxiosResponse<getMessage>> => {
  try {
    return await axiosInstance.get("/messages/conversations");
  } catch (error) {
    throw new Error(`메시지 수신 실패! ${error}`);
  }
};
