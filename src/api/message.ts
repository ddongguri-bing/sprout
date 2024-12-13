import { axiosInstance } from ".";

export const postMessage = async (body: {
  message: string;
  reciever: string;
}) => {
  try {
    return await axiosInstance.post("/messages/create", body);
  } catch (error) {
    throw new Error(`메시지 전송 실패! ${error}`);
  }
};

export const getMessage = async () => {
  try {
    return await axiosInstance.get("/messages/conversations");
  } catch (error) {
    throw new Error(`메시지 수신 실패! ${error}`);
  }
};
