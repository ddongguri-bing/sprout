import { twMerge } from "tailwind-merge";
import Delete from "../assets/delete.svg";
import images from "../assets";
import { useEffect, useState } from "react";
import {
  deleteCannelDelete,
  getChannels,
  postChannelCreate,
} from "../api/channel";
import { useModal } from "../stores/modalStore";

export default function Admin() {
  const [value, setValue] = useState<string>("");
  const [channels, setChannels] = useState<ChannelItem[] | []>([]);
  const setModalOpen = useModal((state) => state.setModalOpen);

  // 입력
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);
  };

  // 채널 목록 호출
  const fetchGetChannel = async () => {
    try {
      const data = await getChannels();
      setChannels(data);
    } catch (error) {
      console.error(`채널 목록 호출 실패 ${error}`);
    }
  };

  // 채널 생성
  const handlePostChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    try {
      await postChannelCreate({
        authRequired: true,
        description: "",
        name: value,
      });
      setValue("");
      setModalOpen(true, {
        message: "채널을 생성하시겠습니까?",
        btnText: "확인",
        btnColor: "main",
        onClick: () => {
          setModalOpen(false);
          fetchGetChannel();
        },
      });
    } catch (error) {
      console.error(`채널 생성 실패 ${error}`);
    }
  };

  // 채널 삭제
  const handleDeleteChannel = async (channelId: string) => {
    try {
      await deleteCannelDelete(channelId);
      setModalOpen(true, {
        message: "채널을 삭제하시겠습니까?",
        btnText: "확인",
        btnColor: "main",
        onClick: () => {
          setModalOpen(false);
          fetchGetChannel();
        },
      });
    } catch (error) {
      console.error(`채널 삭제 실패 ${error}`);
    }
  };

  useEffect(() => {
    fetchGetChannel();
  }, []);

  return (
    <div className="pb-[30px] flex flex-col">
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black border-b border-whiteDark dark:border-gray z-10">
        <h2 className="text-xl font-bold">게시판 목록</h2>
      </div>
      <div>
        <div className="w-full mt-10 flex justify-center">
          <ul className="w-full max-w-[688px] flex flex-col items-start justify-center gap-10">
            {channels?.map((channel) => (
              <li
                key={channel._id}
                className="flex justify-between items-center w-full"
              >
                <div className="flex items-baseline">
                  <p className="font-bold text-[22px]">{channel.name}</p>
                  <p className="ml-[15px] text-gray dark:text-whiteDark">
                    {channel.posts.length}개의 포스트
                  </p>
                </div>
                <button
                  className="text-red underline flex items-center gap-[10px]"
                  onClick={() => handleDeleteChannel(channel._id)}
                >
                  삭제하기 <img src={Delete} alt="delete icon" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex justify-center mt-[100px]">
          <form
            className={twMerge(
              "w-full max-w-[688px] flex justify-center items-center px-5 py-[15px] border border-main rounded-[8px]"
            )}
            onSubmit={handlePostChannel}
          >
            <input
              className="w-full h-6 focus:outline-none scroll resize-none bg-white dark:bg-black"
              onChange={handleChange}
              placeholder="생성할 채널 이름을 입력해주세요"
              value={value}
            ></input>
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
