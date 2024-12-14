import { twMerge } from "tailwind-merge";
import Delete from "../assets/delete.svg";
import TextareaAutosize from "react-textarea-autosize";
import images from "../constants/images";
import { useState } from "react";

export default function Admin() {
  const [value, setValue] = useState<string>("");

  // 입력
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);
  };

  // 엔터 금지(게시판 제목은 한 줄만 입력 가능, 다른 기능은 추후 추가 예정)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="pb-[30px] flex flex-col">
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black border-b border-whiteDark dark:border-gray z-10">
        <h2 className="text-xl font-bold">게시판 목록</h2>
      </div>
      <div>
        <div className="w-full mt-10 flex justify-center">
          <ul className="w-full max-w-[688px] flex flex-col items-start justify-center gap-10">
            <li className="flex justify-between items-center w-full">
              <div className="flex items-baseline">
                <p className="font-bold text-[22px]">고양이</p>
                <p className="ml-[15px] text-gray dark:text-whiteDark">
                  1000개의 포스트
                </p>
              </div>
              <button className="text-red underline flex items-center gap-[10px]">
                삭제하기 <img src={Delete} alt="delete icon" />
              </button>
            </li>
            <li className="flex justify-between items-center w-full">
              <div className="flex items-baseline">
                <p className="font-bold text-[22px]">건강</p>
                <p className="ml-[15px] text-gray dark:text-whiteDark">
                  1개의 포스트
                </p>
              </div>
              <button className="text-red underline flex items-center gap-[10px]">
                삭제하기 <img src={Delete} alt="delete icon" />
              </button>
            </li>
            <li className="flex justify-between items-center w-full">
              <div className="flex items-baseline">
                <p className="font-bold text-[22px]">공부</p>
                <p className="ml-[15px] text-gray dark:text-whiteDark">
                  1개의 포스트
                </p>
              </div>
              <button className="text-red underline flex items-center gap-[10px]">
                삭제하기 <img src={Delete} alt="delete icon" />
              </button>
            </li>
            <li className="flex justify-between items-center w-full">
              <div className="flex items-baseline">
                <p className="font-bold text-[22px]">독서</p>
                <p className="ml-[15px] text-gray dark:text-whiteDark">
                  2개의 포스트
                </p>
              </div>
              <button className="text-red underline flex items-center gap-[10px]">
                삭제하기 <img src={Delete} alt="delete icon" />
              </button>
            </li>
            <li className="flex justify-between items-center w-full">
              <div className="flex items-baseline">
                <p className="font-bold text-[22px]">요리</p>
                <p className="ml-[15px] text-gray dark:text-whiteDark">
                  1개의 포스트
                </p>
              </div>
              <button className="text-red underline flex items-center gap-[10px]">
                삭제하기 <img src={Delete} alt="delete icon" />
              </button>
            </li>
            <li className="flex justify-between items-center w-full">
              <div className="flex items-baseline">
                <p className="font-bold text-[22px]">자격증</p>
                <p className="ml-[15px] text-gray dark:text-whiteDark">
                  0개의 포스트
                </p>
              </div>
              <button className="text-red underline flex items-center gap-[10px]">
                삭제하기 <img src={Delete} alt="delete icon" />
              </button>
            </li>
          </ul>
        </div>
        <div className="w-full flex justify-center mt-[100px]">
          <form
            className={twMerge(
              "w-full max-w-[688px] flex justify-center items-center px-5 py-[15px] border border-main rounded-[8px]"
            )}>
            <TextareaAutosize
              className="w-full h-6 focus:outline-none scroll resize-none bg-white dark:bg-black"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="댓글을 입력해주세요"
              value={value}
            />
            <button className="mt-[2px] ml-1" type="submit">
              <img
                src={value ? images.SendActive : images.Send}
                alt="send icon"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
