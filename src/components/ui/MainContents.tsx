import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { categories } from "../../constants/main";
export default function MainContents() {
  const [selectedCategory, setSelectedCategory] = useState("Health");
  const [selectedImg, setSelectedImg] = useState<string>(categories[0].img);

  return (
    <div className="w-full max-w-[777px] mt-[50px] md:mt-[30px]">
      <ul
        className={twMerge(
          "font-roboto font-semibold text-[22px] flex gap-[10px] md:items-center",
          "md:text-[16px]"
        )}>
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
              }`,
              "flex-1 px-0 text-center"
            )}>
            {category.name}
          </li>
        ))}
      </ul>
      <p
        className={twMerge(
          "mt-[30px] font-light text-[18px] text-gray dark:text-whiteDark ",
          "md:text-[12px] md:mt-5"
        )}>
        {
          categories.find((category) => category.name === selectedCategory)
            ?.description
        }
      </p>
      <div className="w-full h-auto rounded-lg mt-[30px] md:mt-5 bg-white border border-whiteDark overflow-hidden">
        {selectedImg && (
          <img
            src={selectedImg}
            alt="image"
            className="bg-white w-auto h-full object-contain mx-auto "
          />
        )}
      </div>
    </div>
  );
}
