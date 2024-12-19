import images from "../../assets";

export default function EasterEggSu() {
  return (
    <>
      <div className="scene mb-5 hover:scale-110 transition-all ease-linear">
        <div className="cube animate-rotate">
          <div className="side back"></div>
          <div className="side left"></div>
          <div className="side right"></div>
          <div className="side top"></div>
          <div className="side bottom"></div>
          <div className="side front"></div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <a
          className="rounded-[8px] flex items-center justify-center transition-all w-[100px] h-[42px] px-4 text-sm whitespace-nowrap bg-main text-black hover:bg-hoverMain"
          href="https://www.sucoding.kr"
          target="_blank"
        >
          수코딩 사이트
        </a>
        <a
          className="hover:opacity-80"
          href="https://www.youtube.com/@sucoding"
          target="_blank"
        >
          <img className="h-[42px]" src={images.Youtube} alt="youtube icon" />
        </a>
      </div>
    </>
  );
}
