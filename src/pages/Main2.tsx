import { useState } from "react";
import Health from "../assets/health.jpg";
import Study from "../assets/study.jpg";
import Reading from "../assets/reading.jpg";
import Cooking from "../assets/cooking.jpg";

export default function Main2() {
  const [selectedImg, setSelectedImg] = useState({});
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="w-full max-w-[777px]">
        <h2 className=" font-roboto font-bold text-[50px] leading-[55px]">
          Together We Grow,
          <br /> Together We Achieve
        </h2>
        <p className="mt-[30px] font-light text-gray">
          건강, 공부, 독서, 요리, 자격증까지, 당신의 열정을 키울 수 있는 공간,
          SPROUT
          <br />
          관심사를 공유하고 서로 격려하며 목표를 이루는 여정을 함께하세요
        </p>
      </div>
      <div className="w-full max-w-[777px] mt-[50px]">
        <ul className="font-roboto font-semibold text-[22px] flex gap-[10px]">
          <li
            onClick={() => setSelectedImg(Health)}
            className="bg-[#91C788]/30 hover:bg-main px-[55px] py-[21px] rounded-lg duration-200">
            Health
          </li>
          <li className="bg-[#91C788]/30 hover:bg-main px-[55px] py-[21px] rounded-lg duration-200">
            Study
          </li>
          <li className="bg-[#91C788]/30 hover:bg-main px-[55px] py-[21px] rounded-lg duration-200">
            Reading
          </li>
          <li className="bg-[#91C788]/30 hover:bg-main px-[55px] py-[21px] rounded-lg duration-200">
            Cooking
          </li>
        </ul>
        <div className="w-full h-[500px] rounded-lg mt-[30px] bg-whiteDark">
          {selectedImg ? <img></img> : <p></p>}
        </div>
      </div>
    </div>
  );
}
