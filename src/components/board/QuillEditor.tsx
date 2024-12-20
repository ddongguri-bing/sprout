import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function QuillEditor({
  getEditorText,
  value,
}: {
  getEditorText: (text: string) => void;
  value: string;
}) {
  const handleChange = (content: string) => {
    getEditorText(content); // Update the parent state on change
  };

  useEffect(() => {
    // You can also ensure that the editor text is synced with parent state when it changes
    getEditorText(value);
  }, [value, getEditorText]);

  return (
    <div className="w-full">
      <ReactQuill
        theme="bubble"
        value={value} // Control the editor value via value prop
        onChange={handleChange} // Propagate the change to parent
        placeholder="본인의 이야기를 공유해보세요!"
        modules={{
          toolbar: [
            [{ bold: true }, { italic: true }, { link: true }],
          ],
        }}
      />
    </div>
  );
}
