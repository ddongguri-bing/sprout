import Spinner from "../../assets/spinner.gif";

export default function Loading() {
  return (
    <div className="flex items-top justify-center mt-[100px]">
      <div>
        <img src={Spinner} alt="spinner" />
      </div>
      <div className="ml-[50px]">
        <p className="font-angkor text-[50px] dark:text-white">SPROUT</p>
        <p className="font-angkor text-[105px] text-main">Loading..</p>
        <p className="text-gray dark:text-whiteDark text-[22px] mt-20">
          로딩 중입니다...
          <br />
          잠시만 기다려주세요...
        </p>
        <p className="font-angkor text-[20px] dark:text-black w-[250px] h-[60px] rounded-lg bg-main flex items-center justify-center mt-10">
          THANK YOU
        </p>
      </div>
    </div>
  );
}
