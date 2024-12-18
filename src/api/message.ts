import { AxiosResponse } from "axios";
import { axiosInstance } from ".";

export const postMessage = async (body: {
  message: string;
  receiver: string;
}): Promise<AxiosResponse<MessageItem>> => {
  try {
    return await axiosInstance.post("/messages/create", body);
  } catch (error) {
    throw new Error(`메시지 전송 실패! ${error}`);
  }
};

export const getMessageList = async (): Promise<
  AxiosResponse<MessageItem[]>
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
}): Promise<AxiosResponse<MessageItem[]>> => {
  try {
    return await axiosInstance.get(`/messages`, {
      params: { userId: id },
    });
  } catch (error) {
    throw new Error(`채팅창 불러오기 실패! ${error}`);
  }
};

//대화상대의 id를 입력하면 대화상대와 나눈 메시지의 seen이 true로 바뀜
export const putUpdateSeen = async (sender: string) => {
  return await axiosInstance.put("/messages/update-seen", {
    sender,
  });
};
