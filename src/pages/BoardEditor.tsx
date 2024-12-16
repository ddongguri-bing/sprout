import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import DraftEditor from "../components/board/DraftEditor";
import "draft-js/dist/Draft.css";
import { createPost, updatePost } from "../api/posting";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { getPostById } from "../api/board";
import Modal from "../components/common/Modal";
import { useModal } from "../stores/modalStore";
import images from "../constants/images";

import { useTriggerStore } from "../stores/triggerStore";
import { twMerge } from "tailwind-merge";
import { postImages } from "../api/imgbb";
import Loading from "../components/common/Loading";

export default function BoardEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const channelName = searchParams.get("name");

  const modalOpen = useModal((state) => state.modalOpen);
  const setModalOpen = useModal((state) => state.setModalOpen);

  //update인지 create인지 확인용
  const { id, postId } = useParams();
  const currentPostId = postId!;

  const [editorText, setEditorText] = useState("");
  const [preview, setPreview] = useState<string[]>([]);

  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);

  //현재 포스트 가져오기
  const getCurrentPost = async () => {
    try {
      const currentPost = await getPostById(currentPostId);
      const parsedData = JSON.parse(currentPost.title);
      setEditorText(parsedData.text);
      if (parsedData.images && parsedData.images.length) {
        setImageUrl(parsedData.images);
        setPreview(parsedData.images);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      alert("포스트를 불러오는 중 문제가 발생했습니다.");
    }
  };

  //editor에서 텍스트 가져오기
  const getEditorText = (text: string) => {
    setEditorText(text);
  };

  //완료 버튼
  const handleCreatePost = async () => {
    if (!editorText && preview.length === 0) {
      setModalOpen(true, {
        message: "내용이 없습니다. 작성을 취소하시겠습니까?",
        btnText: "확인",
        btnColor: "main",
        onClick: () => {
          navigate(-1);
          setModalOpen(false);
        },
      });
      return;
    }

    setUploading(true);

    const uploadedUrls: string[] = []; // 업로드된 URL을 저장할 배열

    try {
      // 이미지 순차 업로드
      for (const file of image) {
        const formData = new FormData();
        formData.append("image", file);

        //이미지 업로드
        const data = await postImages(formData);

        if (data.success) {
          uploadedUrls.push(data.data.url); // 업로드된 URL을 배열에 추가
          console.log("이미지 업로드 성공:", data.data.url);
        } else {
          throw new Error("이미지 업로드 실패");
        }
      }

      // 업로드된 이미지 URL 상태 업데이트
      setImageUrl(uploadedUrls);

      const titleData = {
        text: editorText,
        images: [...imageUrl, ...uploadedUrls], // 업로드된 이미지 URL 배열
      };

      if (!currentPostId) {
        await createPost({
          title: JSON.stringify(titleData),
          image: null,
          channelId: id!,
        });
      } else {
        await updatePost({
          postId: postId,
          title: JSON.stringify(titleData),
          image: null,
          imageToDeletePublicId: null,
          channelId: id!,
        });
      }

      navigate(-1);
    } catch (error) {
      console.error("업로드 중 오류:", error);
      alert("업로드 중 문제가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  //이미지 추가 버튼
  const handleImageAdd = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const targetFiles = target.files;

    if (!targetFiles) return;

    const filesArray = Array.from(targetFiles);
    const selectedFiles: string[] = filesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setPreview((prev) => [...prev, ...selectedFiles]); // 미리보기 이미지 추가
    setImage((prev) => [...prev, ...filesArray]); // 실제 파일 정보 추가

    target.value = "";
  };

  //이미지 하나 업로드 가능 기준 삭제
  const handleDeleteImg = (indexToDelete: number) => {
    setPreview((prev) => prev.filter((_, index) => index !== indexToDelete));
    setImageUrl((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const setTargetLink = useTriggerStore((state) => state.setTargetLink);

  useEffect(() => {
    if (channelName) setTargetLink(channelName);
    //update라면 현재 포스트 내용 불러오기
    if (currentPostId) getCurrentPost();
    return () => {
      setTargetLink(null);
    };
  }, []);

  //메모리 누수를 방지하기위해 URL 객체 해제
  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  if (uploading) return <Loading />;

  return (
    <>
      {modalOpen && <Modal />}
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
          <div className="w-full grid grid-cols-2 gap-[10px]">
            {preview.length > 0 &&
              preview.map((url, i) => {
                return (
                  <div
                    key={i}
                    className={twMerge(
                      "rounded-[8px] overflow-hidden relative",
                      "aspect-[399/300] min-h-[100px]"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => handleDeleteImg(i)}
                      className="absolute top-[10px] right-[10px] bg-gray w-10 h-10 flex justify-center items-center rounded-[8px]"
                    >
                      <img
                        src={images.Close}
                        alt="close icon"
                        className="invert"
                      />
                    </button>
                    <img
                      src={url}
                      alt={`image${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            {/* 이미지 미리보기 */}
            {preview.length < 4 && (
              <label
                className={twMerge(
                  "bg-whiteDark flex items-center justify-center rounded-[8px] cursor-pointer",
                   "aspect-[399/300] min-h-[100px]"
                )}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageAdd}
                />
                <img src={images.Plus} alt="plus icon" />
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
