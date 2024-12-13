import Button from "../common/Button";
import TextareaAutosize from "react-textarea-autosize";

export default function SendMessage({ onClose }: { onClose: () => void }) {
  return (
    <form className="w-[calc(100%-32px)] max-w-[425px] h-[230px] p-5  bg-white dark:bg-grayDark rounded-[8px] flex flex-col items-center justify-center">
      <div className="font-bold mb-[30px] bg-white dark:bg-grayDark text-black dark:text-white w-full h-full border border-whiteDark dark:border-gray p-[10px] rounded-[8px]">
        <TextareaAutosize
          className="w-full h-[128px] focus:outline-none scroll resize-none bg-white dark:bg-grayDark font-normal"
          placeholder="사용자님에게 보낼 메세지를 작성해주세요."
          maxRows={4}
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
        <Button
          // onClick={() => setOpen(false)}
          text={"전송"}
          size={"sm"}
        />
      </div>
    </form>
  );
}
