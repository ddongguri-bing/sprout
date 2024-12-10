import { twMerge } from "tailwind-merge";
import { useModal } from "../stores/modalStore";
import Button from "./Button";

export default function Modal() {
  const { message, btnColor, btnText, onClick } = useModal(
    (state) => state.modalOpts
  );
  const setOpen = useModal((state) => state.setModalOpen);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-[9999]">
      <article className="w-[calc(100%-32px)] max-w-[425px] h-[230px] bg-white rounded-[8px] flex flex-col items-center justify-center">
        <div className="font-bold mb-[30px]">{message}</div>
        <div className="flex items-center gap-5">
          <Button
            onClick={() => setOpen(false)}
            text={"취소"}
            size={"sm"}
            theme="sub"
          />
          <button
            onClick={onClick}
            className={twMerge(
              "w-[100px] h-[42px] px-4 flex items-center justify-center text-[12px] font-medium rounded-[8px]",
              btnColor === "main" && "bg-main text-black",
              btnColor === "red" && "bg-red text-white"
            )}
          >
            {btnText}
          </button>
        </div>
      </article>
    </div>
  );
}
