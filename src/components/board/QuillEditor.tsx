import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

interface QuillEditorType {
  getEditorText: (text: string) => void;
  value: string;
}

export default function QuillEditor({ getEditorText, value }: QuillEditorType) {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleChange = (content: string) => {
    getEditorText(content);
  };

  useEffect(() => {
    //툴팁 placeholder 변경
    const quillInstance = quillRef.current?.getEditor();
    if (!quillInstance) return;

    const handleTooltipDisplay = () => {
      const tooltipInput = document.querySelector(".ql-tooltip-editor input");
      if (tooltipInput) {
        tooltipInput.setAttribute("placeholder", "https://sucoding.kr");
      }
    };
    quillInstance.on("editor-change", handleTooltipDisplay);

    return () => {
      quillInstance.off("editor-change", handleTooltipDisplay);
    };
  }, []);

  return (
    <div className="w-full">
      <ReactQuill
        theme="bubble"
        value={value}
        onChange={handleChange}
        placeholder="본인의 이야기를 공유해보세요!"
        modules={{
          toolbar: [
            [
              { bold: true },
              { italic: true },
              { link: true },
              { underline: true },
              { strike: true },
            ],
          ],
        }}
        ref={quillRef}
      />
    </div>
  );
}
