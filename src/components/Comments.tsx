import { useState } from "react";
import Send from "../assets/send.svg";
import SendAcitve from "../assets/send_active.svg";

export default function Comments() {
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);
  return (
    <div className="w-full flex flex-col gap-5">
      <form action="">
        <textarea onChange={handleChange} value={value}>
          댓글을 입력해주세요
        </textarea>
        <button type="submit" disabled={!value}>
          <img src={value ? SendAcitve : Send} alt="send icon" />
        </button>
      </form>
    </div>
  );
}
