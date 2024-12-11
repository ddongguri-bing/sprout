import { useState } from "react";
import PlusIcon from "../assets/plus.svg";
import CloseIcon from "../assets/close.svg";
import Button from "../components/Button";
import DraftEditor from "../components/DraftEditor";
import "draft-js/dist/Draft.css";
import { createPost } from "../api/posting";

export default function BoardEditor() {
  const [editorText, setEditorText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<FileList | null>(null);

  const getEditorText = (text: string) => {
    setEditorText(text);
  };
  //완료 버튼
  const handleCreatePost = () => {
    console.log(editorText);
    console.log(images);
    createPost({
      title: editorText,
      image: imageFile,
      channelId: "67581af49655831727c9c92d",
    });
  };

  const handleImageAdd = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const targetFiles = target.files as FileList;
    setImageFile(targetFiles);
    const targetFilesArray = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(selectedFiles);
    setImages((prev) => [...prev, ...selectedFiles]);
    target.value = "";
  };

  //이미지 하나 업로드 가능 기준
  const handleDeleteImg = () => {
    setImages([]);
  };

  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] px-[30px] mb-[50px] sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black dark:text-white border-b border-whiteDark dark:border-gray z-10">
        <h2 className="text-xl font-bold">고양이 사진첩</h2>
        <div className="flex items-center gap-5">
          <Button
            onClick={() => history.back()}
            theme="sub"
            text={"취소"}
            size={"sm"}
          />
          <Button text={"완료"} size={"sm"} onClick={handleCreatePost} />
        </div>
      </div>
      <div className="w-full max-w-[777px] flex flex-col items-start gap-5 mx-auto px-[15px]">
        <DraftEditor getEditorText={getEditorText} />
        <div className="w-full grid grid-cols-1 gap-[10px]">
          {images.length === 0 ? (
            <label className="bg-whiteDark flex items-center justify-center rounded-[8px] h-[189px] cursor-pointer">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageAdd}
              />
              <img src={PlusIcon} alt="plus icon" />
            </label>
          ) : (
            <>
              {images.map((url, i) => {
                return (
                  <div
                    key={i}
                    className="rounded-[8px] overflow-hidden relative"
                  >
                    <button
                      type="button"
                      onClick={handleDeleteImg}
                      className="absolute top-[10px] right-[10px] bg-gray w-10 h-10 flex justify-center items-center rounded-[8px]"
                    >
                      <img
                        src={CloseIcon}
                        alt="close icon"
                        className="invert"
                      />
                    </button>
                    <img
                      src={url}
                      alt={`image${i}`}
                      className="obejct-cover w-full h-full"
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
