import { useEffect, useState } from "react";
import { ContentState, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

interface DraftEditorProps {
  getEditorText: (text: string) => void;
  editorText: string;
}

const DraftEditor = ({ getEditorText, editorText }: DraftEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (editorText && editorState.getCurrentContent().getPlainText() !== editorText) {
      const contentState = ContentState.createFromText(editorText);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [editorText]); // editorText가 변경될 때마다 실행

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
