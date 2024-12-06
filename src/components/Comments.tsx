import { useState } from "react";
import Send from "../assets/send.svg";
import SendAcitve from "../assets/send_active.svg";
import { twMerge } from "tailwind-merge";
import TextareaAutosize from "react-textarea-autosize";
import CommentItem from "./CommentItem";

export default function Comments() {
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);
  return (
    <div className="w-full flex flex-col gap-5 mt-[10px]">
      <form
        action=""
        className={twMerge(
          "w-full flex items-start px-5 py-[15px] border border-main rounded-[8px]"
        )}
      >
        <TextareaAutosize
          className="w-full h-6 focus:outline-none resize-none"
          onChange={handleChange}
          value={value}
          placeholder="댓글을 입력해주세요"
          maxRows={3}
        ></TextareaAutosize>
        <button className="mt-[2px]" type="submit" disabled={!value}>
          <img src={value ? SendAcitve : Send} alt="send icon" />
        </button>
      </form>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}
