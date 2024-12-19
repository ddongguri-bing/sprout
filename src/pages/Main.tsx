import { twMerge } from "tailwind-merge";
import MainContents from "../components/ui/MainContents";

export default function Main() {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-center items-center m-10",
        "md:m-[20px]"
      )}>
      <div className="w-full max-w-[777px]">
        <h2
          className={twMerge(
            "font-roboto font-bold text-[50px] leading-[55px]",
            "md:text-[24px]  md:leading-[30px]"
          )}>
          Together We Grow,
          <br /> Together We Achieve
        </h2>
        <p className="mt-[30px] md:mt-5 font-light text-gray dark:text-whiteDark md:hidden break-keep">
          건강, 공부, 독서, 요리, 자격증까지, 당신의 열정을 키울 수 있는 공간,
          SPROUT
          <br />
          관심사를 공유하고 서로 격려하며 목표를 이루는 여정을 함께하세요
        </p>
      </div>
      <MainContents />
    </div>
  );
}
