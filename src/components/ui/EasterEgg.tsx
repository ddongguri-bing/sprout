import { twMerge } from "tailwind-merge";
import images from "../../assets";
import { useEffect, useState } from "react";
import easterEggs from "../../constants/easterEggs";
import EasterEggSu from "./EasterEggSu";
import EasterEggImage from "./EasterEggImage";

export default function EasterEgg({
  easterEgg,
  onClose,
}: {
  easterEgg: string;
  onClose: () => void;
}) {
  const BG_STYLE =
    "fixed top-0 left-0 right-0 bottom-0 inset-0 flex flex-col justify-center items-center bg-black/40 z-20 opacity-0 transition-all ease-linear";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);
  }, []);

  return (
    <div className={twMerge(BG_STYLE, mounted && "opacity-100")}>
      <div className="w-[calc(100%-32px)] max-w-[500px] flex justify-end mb-4">
        <button
          className="p-3 rounded-full bg-black/80 hover:opacity-70 transition-all"
          onClick={onClose}
        >
          <img className="w-5 invert" src={images.Close} alt="close icon" />
        </button>
      </div>
      {easterEgg === easterEggs[0] ? (
        <EasterEggSu />
      ) : (
        <EasterEggImage easterEgg={easterEgg} />
      )}
    </div>
  );
}
