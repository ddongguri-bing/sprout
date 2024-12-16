import { useState } from "react";
import images from "../../constants/images";
import UserItemSkeleton from "../common/skeleton/UserItemSkeleton";
import ChatItem from "./ChatItem";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthStore } from "../../stores/authStore";
import { twMerge } from "tailwind-merge";
import { getChatList, postMessage } from "../../api/message";

interface ChatMessage {
  onClose: () => void;
  users: {
    _id: string;
    fullName: string;
    image?: string;
    message: string;
  }[];
  loading: boolean;
}

export default function ChatMessage({ onClose, users, loading }: ChatMessage) {
  const itemHeight = 50;
  const maxItems = 10;
  const containerHeight = maxItems * itemHeight;

  const [modalContentType, setModalContentType] = useState<"LIST" | "CHAT">(
    "LIST"
  );
  const [currentUser, setCurrentUser] = useState<{
    fullName: string;
    _id: string;
  } | null>(null);

  // 특정 유저와의 채팅 목록 모달 열기
  const handleOpenModal = (user: { fullName: string; _id: string }) => {
    if (!user._id) {
      console.error("user id가 없습니다");
      return;
    }
    setCurrentUser(user);
    setModalContentType("CHAT");
    handleChatList(user._id);
  };

  // 특정 유저와의 채팅 목록 모달 닫기
  const handleCloseModal = () => {
    setModalContentType("LIST");
    setCurrentUser(null);
  };

  const loggedInUser = useAuthStore((state) => state.user);

  const [messages, setMessages] = useState<
    {
      message: string;
      messageId: string;
      senderId: string;
      receiverId: string;
      isReceived: boolean;
    }[]
  >([]);
  const [value, setValue] = useState<string>("");

  // 특정 유저와의 채팅 목록
  const handleChatList = async (userId?: string) => {
    if (!loggedInUser) return;
    if (!userId) return;
    loading = true;
    try {
      const { data } = await getChatList({ id: userId });
      const filterMessages = data.filter(
        (user: any) =>
          (user.sender._id === userId &&
            user.receiver._id === loggedInUser._id) ||
          (user.sender._id === loggedInUser._id && user.receiver._id === userId)
      );
      const fetchedMessages = filterMessages.map((user: any) => ({
        message: user.message,
        messageId: user._id,
        senderId: user.sender._id,
        receiverId: user.receiver._id,
        isReceived: user.receiver._id === loggedInUser._id,
      }));

      setMessages(fetchedMessages);
      console.log(fetchedMessages);
    } catch (error) {
      console.error("messages를 불러오지 못함:", error);
    } finally {
      loading = false;
    }
  };

  //채팅 방에서 메시지 보내기
  const handleSendMessage = async () => {
    if (!value.trim() || !loggedInUser || !currentUser) return;

    try {
      const { data } = await postMessage({
        message: value,
        receiver: currentUser._id,
      });
      setMessages((prev) => [
        ...prev.filter(
          (msg) =>
            msg.senderId === currentUser._id ||
            msg.receiverId === currentUser._id
        ),
        ...(data.sender._id === currentUser?._id ||
        data.receiver._id === currentUser?._id
          ? [
              {
                message: data.message,
                messageId: data._id,
                senderId: data.sender._id,
                receiverId: data.receiver._id,
                isReceived: data.receiver._id === loggedInUser._id,
              },
            ]
          : []),
      ]);
      setValue("");
    } catch (error) {
      console.error("메시지 전송 실패", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <article className="w-[calc(100%-32px)] max-w-[600px] bg-white dark:bg-grayDark pt-5 pb-[30px] rounded-[8px] flex flex-col px-[44px]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          {modalContentType === "CHAT" ? currentUser?.fullName : "대화 목록"}
        </h2>
        <button
          onClick={modalContentType === "CHAT" ? handleCloseModal : onClose}
        >
          <img className="dark:invert" src={images.Close} alt="close icon" />
        </button>
      </div>
      {/* 채팅 내용 */}
      <div
        className=" overflow-y-auto scroll"
        style={{ height: `${containerHeight}px` }}
      >
        {modalContentType === "LIST" ? (
          loading ? (
            <div className="w-full text-lg font-bold h-full flex flex-col gap-5">
              {Array(maxItems)
                .fill(0)
                .map((_, idx) => (
                  <UserItemSkeleton key={`receive-message-${idx}`} />
                ))}
            </div>
          ) : users.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {users.map((user, idx) => (
                <ChatItem
                  key={idx}
                  user={user}
                  msg={{ message: user.message }}
                  onOpen={() => handleOpenModal(user)}
                />
              ))}
            </ul>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-gray dark:text-whiteDark">
              "메시지가 존재하지 않습니다"
            </div>
          )
        ) : (
          // 채팅 상세보기
          <div className="flex flex-col h-full gap-5">
            <div className="flex-1 overflow-y-auto flex flex-col gap-5">
              {messages.map((msg) => (
                <div
                  key={msg.messageId}
                  className={`flex ${
                    msg.isReceived ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`${msg.isReceived ? "ml-[30px]" : "mr-[30px]"} ${
                      msg.isReceived ? "bg-whiteDark" : "bg-main"
                    } min-h-[50px] max-w-[342px] rounded-[8px] p-3`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className={twMerge(
                "w-full flex items-start px-5 py-[15px] border border-main rounded-[8px] mt-auto"
              )}
              style={{
                marginBottom: "30px",
              }}
            >
              <TextareaAutosize
                className="w-full h-6 focus:outline-none  scroll resize-none bg-white dark:bg-black"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={value}
                placeholder={`[${currentUser?.fullName}]에게 보낼 메시지를 작성해주세요`}
                maxRows={3}
              />
              <button
                className="mt-[2px] ml-1"
                type="submit"
                disabled={!value.trim()}
              >
                <img
                  src={value ? images.SendActive : images.Send}
                  alt="send icon"
                />
              </button>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}
