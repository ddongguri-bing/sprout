import { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

interface DraftEditorProps {
  getEditorText: (text: string) => void;
}

const DraftEditor = ({ getEditorText }: DraftEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    getEditorText(newEditorState.getCurrentContent().getPlainText());
  };

  return (
    <Editor
      editorState={editorState}
      onChange={handleEditorChange}
      placeholder="본인의 이야기를 공유해보세요!"
    />
  );
};

export default DraftEditor;