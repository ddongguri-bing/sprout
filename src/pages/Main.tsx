import { useState } from "react";
import Health from "../assets/health.jpg";
import Study from "../assets/study.jpg";
import Reading from "../assets/reading.jpg";
import Cooking from "../assets/cooking.jpg";
import { twMerge } from "tailwind-merge";

export default function Main2() {
  const [selectedCategory, setSelectedCategory] = useState("Health");
  const [selectedImg, setSelectedImg] = useState<string>(Health);

  const categories = [
    {
      name: "Health",
      img: Health,
      description: "몸도 마음도 건강하게, 더 나은 하루를 만들어가요",
    },
    {
      name: "Study",
      img: Study,
      description: "같이 배우고 성장하는 공간에서 목표를 향해 함께 달려요",
    },
    {
      name: "Reading",
      img: Reading,
      description: "책 한 권의 힘을 믿고 당신의 이야기를 공유하세요",
    },
    {
      name: "Cooking",
      img: Cooking,
      description:
        "맛있는 한 끼, 따뜻한 나눔, 요리로 소통하는 즐거움을 발견하세요",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="w-full max-w-[777px]">
        <h2 className=" font-roboto font-bold text-[50px] leading-[55px]">
          Together We Grow,
          <br /> Together We Achieve
        </h2>
        <p className="mt-[30px] font-light text-gray dark:text-whiteDark">
          건강, 공부, 독서, 요리, 자격증까지, 당신의 열정을 키울 수 있는 공간,
          SPROUT
          <br />
          관심사를 공유하고 서로 격려하며 목표를 이루는 여정을 함께하세요
        </p>
      </div>
      <div className="w-full max-w-[777px] mt-[50px]">
        <ul className="font-roboto font-semibold text-[22px] flex gap-[10px]">
          {categories.map((category) => (
            <li
              key={category.name}
              onClick={() => {
                setSelectedImg(category.img);
                setSelectedCategory(category.name);
              }}
              className={twMerge(
                `px-[55px] py-[21px] rounded-lg duration-200 cursor-pointer dark:text-black ${
                  selectedCategory === category.name
                    ? "bg-main"
                    : "bg-[#91C788]/30 dark:bg-[#DEEEDB]"
                }`
              )}>
              {category.name}
            </li>
          ))}
        </ul>
        <p className="mt-[30px] font-light text-[18px] text-gray dark:text-whiteDark">
          {
            categories.find((category) => category.name === selectedCategory)
              ?.description
          }
        </p>
        <div className="w-full h-[500px] rounded-lg mt-[30px] bg-white border border-whiteDark overflow-hidden">
          {selectedImg && (
            <img
              src={selectedImg}
              alt="image"
              className="bg-white w-auto h-full object-contain mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
