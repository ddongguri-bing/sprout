import images from "../../constants/images";

export default function ChatMessage({ onClose }: { onClose: () => void }) {
  return (
    <article className="w-[calc(100%-32px)] max-w-[600px] bg-white dark:bg-grayDark pt-5 pb-[30px] rounded-[8px] flex flex-col px-[44px]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">대화 목록</h2>
        <button onClick={onClose}>
          <img className="dark:invert" src={images.Close} alt="close icon" />
        </button>
      </div>
      <div className="flex-1 max-h-[450px] scroll overflow-y-auto"></div>
    </article>
  );
}
