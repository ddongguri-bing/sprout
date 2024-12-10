import QuillEditor from "../components/QuillEditor";
import PlusIcon from "../assets/plus.svg";
import Button from "../components/Button";
export default function BoardEditor() {
  const handleCreatePost = () => {
    console.log("hi");
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
      <div className="w-full max-w-[777px] flex flex-col items-start gap-5 mx-auto ">
        <QuillEditor />
        <div className="w-full grid grid-cols-2 px-[15px]">
          <label className="bg-whiteDark flex items-center justify-center rounded-[8px] h-[189px] cursor-pointer">
            <input type="file" hidden accept="image/*" />
            <img src={PlusIcon} alt="plus icon" />
          </label>
        </div>
      </div>
    </div>
  );
}
