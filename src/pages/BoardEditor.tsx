import { useEffect, useState } from "react";
import PlusIcon from "../assets/plus.svg";
import CloseIcon from "../assets/close.svg";
import Button from "../components/Button";
import DraftEditor from "../components/DraftEditor";
import "draft-js/dist/Draft.css";
import { createPost, updatePost } from "../api/posting";
import { useNavigate, useParams } from "react-router";
import { getPostById } from "../api/board";

export default function BoardEditor() {
  const navigate = useNavigate();
  //update인지 create인지 확인용
  const { id, postId } = useParams();
  const currentPostId = postId!;

  const [editorText, setEditorText] = useState("");
  const [preview, setPreview] = useState<string[]>([]);

  const [image, setImage] = useState<File | null>(null);

  //이미지 삭제 로직용
  const [existImage, setExistImage] = useState("");
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  //현재 포스트 가져오기
  const getCurrentPost = async () => {
    const currentPost = await getPostById(currentPostId);
    setEditorText(currentPost.title);
    if (currentPost.image) setPreview([currentPost.image]);
    setExistImage(currentPost.imagePublicId);
  };

  //editor에서 텍스트 가져오기
  const getEditorText = (text: string) => {
    setEditorText(text);
  };

  //완료 버튼
  const handleCreatePost = async () => {
    //id가 없으면 create
    if (!currentPostId) {
      await createPost({
        title: editorText,
        image: image,
        channelId: id!,
      });
      navigate(-1);
      //id가 있으면 update
    } else {
      await updatePost({
        postId: postId,
        title: editorText,
        image: image,
        imageToDeletePublicId: imageToDelete,
      });
      navigate(-1);
    }
  };

  //이미지 추가 버튼
  const handleImageAdd = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const targetFiles = target.files;
    if (!targetFiles) return;
    const file = targetFiles[0];
    setImage(file);

    const targetFilesArray = Array.from(targetFiles);
    const selectedFiles: string[] = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(selectedFiles);
    setPreview((prev) => [...prev, ...selectedFiles]);
    target.value = "";
  };

  //이미지 하나 업로드 가능 기준 삭제
  const handleDeleteImg = () => {
    setPreview([]);
    setImage(null);
    if (currentPostId) {
      setImageToDelete(existImage);
    }
  };

  useEffect(() => {
    //update라면 현재 포스트 내용 불러오기
    if (currentPostId) getCurrentPost();
  }, []);

  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] px-[30px] mb-[50px] sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black dark:text-white border-b border-whiteDark dark:border-gray z-10">
        <h2 className="text-xl font-bold">{postId ? "수정" : "작성"}</h2>
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
        <DraftEditor getEditorText={getEditorText} editorText={editorText} />
        <div className="w-full grid grid-cols-1 gap-[10px]">
          {preview.length === 0 ? (
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
              {preview.map((url, i) => {
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
