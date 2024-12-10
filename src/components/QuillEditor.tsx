import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function QuillEditor() {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      className="w-full [&_p]:text-base "
      theme="bubble"
      value={value}
      onChange={setValue}
      //TODO: 테마 정해지면 수정할 수 있음
      placeholder="본인의 이야기를 공유해보세요!"
    />
  );
}
