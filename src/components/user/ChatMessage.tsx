import { useEffect, useState } from "react";
import images from "../../constants/images";
import UserItemSkeleton from "../common/skeleton/UserItemSkeleton";
import ChatItem from "./ChatItem";
import TextareaAutosize from "react-textarea-autosize";
import { getMessage } from "../../api/message";
import { useAuthStore } from "../../stores/authStore";
import { twMerge } from "tailwind-merge";

interface ChatMessage {
  onClose: () => void;
  users: {
    _id?: string;
    fullName?: string;
    image?: string;
    message?: string;
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
    fullName?: string;
    _id?: string;
  } | null>(null);

  const handleOpenModal = (user: { fullName?: string; _id?: string }) => {
    setCurrentUser(user);
    setModalContentType("CHAT");
  };

  const handleCloseModal = () => {
    setModalContentType("LIST");
    setCurrentUser(null);
  };

  const loggedInUser = useAuthStore((state) => state.user);

  const [messages, setMessages] = useState<
    { message: string; isReceived: boolean }[]
  >([]);
  const [value, setValue] = useState<string>("");

  const fetchMessages = async () => {
    if (!loggedInUser) return;
    loading = true;
    try {
      const { data } = await getMessage();
      const fetchedMessages = data.map((user: any) => ({
        message: user.message,
        isReceived: user.receiver._id === loggedInUser._id,
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      loading = false;
    }
  };

  const handleSendMessage = async () => {
    if (!value.trim() || !loggedInUser || !currentUser) return;

    try {
      const { data } = await postMessage({
        message: value,
        receiver: currentUser._id,
      });
      setMessages((prev) => [
        ...prev,
        { message: data.message, isReceived: false },
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

  useEffect(() => {
    fetchMessages();
  }, []);

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
              {users.map((user) => (
                <ChatItem
                  key={user._id}
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
          <div className="flex flex-col gap-5">
            <div className="flex-1 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.isReceived ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`${msg.isReceived ? "ml-[30px]" : "mr-[30px]"} ${
                      msg.isReceived ? "bg-whiteDark" : "bg-main text-white"
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
