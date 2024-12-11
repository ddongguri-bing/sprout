import { useState } from "react";
import PlusIcon from "../assets/plus.svg";
import Button from "../components/Button";
import DraftEditor from "../components/DraftEditor";
import "draft-js/dist/Draft.css";
import axios from "axios";

export default function BoardEditor() {
  const [editorText, setEditorText] = useState("");
  const getEditorText = (text: string) => {
    setEditorText(text);
  };
  const handleCreatePost = () => {
    console.log(editorText);
  };

  const [images, setImages] = useState<string[]>([]);

  const handleImageAdd = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const targetFiles = target.files as FileList;
    const targetFilesArray = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(selectedFiles);
    setImages((prev) => [...prev, ...selectedFiles]);
    target.value = "";
  };

  const hadleImgur = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const targetFiles = target.files as FileList;
    const targetFilesArray = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    const formData = new FormData();

    formData.append("image", selectedFiles[0]);

    try {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        {
          headers: {
            Authorization: "Client-ID 22b031d87323109", // Imgur Client ID
          },
        }
      );
      const { link } = response.data.data;
      console.log(link);
    } catch (error) {}
  };

  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] px-[30px] mb-[50px] sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black dark:text-white border-b border-whiteDark dark:border-gray">
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
        <div className="w-full grid grid-cols-2 gap-[10px]">
          <label className="bg-whiteDark flex items-center justify-center rounded-[8px] h-[189px] cursor-pointer">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageAdd}
            />
            <img src={PlusIcon} alt="plus icon" />
          </label>
          <>
            {images.map((url, i) => {
              return (
                <div
                  key={i}
                  className="border border-white rounded-[8px] h-[189px] overflow-hidden"
                >
                  <img
                    src={url}
                    alt={`image${i}`}
                    className="obejct-cover w-full h-full"
                  />
                </div>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
}
