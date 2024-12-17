import { FormEvent, useState } from "react";
import Button from "../common/Button";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthStore } from "../../stores/authStore";
import { postMessage } from "../../api/message";

export default function SendMessage({
  onClose,
  checkLogin,
  receiver,
}: {
  onClose: () => void;
  checkLogin: () => void;
  receiver: { fullName: string; _id: string };
}) {
  const user = useAuthStore((state) => state.user);
  const [msgContent, setMsgContent] = useState<string>("");

  const handleSendMsg = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return checkLogin();
    if (!receiver) return;

    try {
      const { data } = await postMessage({
        message: msgContent,
        receiver: receiver._id,
      });
      setMsgContent("");
      return data;
    } catch (error) {
      console.error(`메시지 전송 실패` + error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMsg(e);
        onClose();
      }}
      className="w-[calc(100%-32px)] max-w-[425px] h-[230px] p-5  bg-white dark:bg-grayDark rounded-[8px] flex flex-col items-center justify-center"
    >
      <div className="font-bold mb-[30px] bg-white dark:bg-grayDark text-black dark:text-white w-full h-full border border-whiteDark dark:border-gray p-[10px] rounded-[8px]">
        <TextareaAutosize
          className="w-full h-[128px] focus:outline-none scroll resize-none bg-white dark:bg-grayDark font-normal"
          placeholder={`[${receiver.fullName}]님에게 보낼 메세지를 작성해주세요.`}
          value={msgContent}
          maxRows={4}
          onChange={(e) => setMsgContent(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-5">
        <Button
          onClick={onClose}
          className="dark:bg-gray dark:text-white dark:border-none"
          text={"취소"}
          size={"sm"}
          theme="sub"
        />
        <Button type="submit" text={"전송"} size={"sm"} />
      </div>
    </form>
  );
}
