import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex md:flex-col items-top md:items-start justify-center mt-[100px] bg-white dark:bg-black md:px-[26px]">
      <div className="md:mb-[80px]">
        <FadeLoader
          color="#91C788"
          height={25}
          width={8}
          radius={10}
          margin={20}
        />
      </div>
      <div className="ml-[50px] md:ml-0 md:text-left">
        <p className="font-angkor text-[50px] md:text-[40px] text-main">
          SPROUT
        </p>
        <p className="font-angkor text-[105px] md:text-[60px] dark:text-white ">
          Loading..
        </p>
        <p className="text-gray dark:text-whiteDark text-[22px] md:text-[14px] md:mb-[50px]">
          로딩 중입니다...
          <br />
          잠시만 기다려주세요...
        </p>
        <p className="font-angkor text-[20px] dark:text-black w-[250px] h-[60px] rounded-lg bg-main flex items-center justify-center">
          THANK YOU
        </p>
      </div>
    </div>
  );
}
