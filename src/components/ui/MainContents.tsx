import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { categories } from "../../constants/main";
export default function MainContents() {
  const [selectedCategory, setSelectedCategory] = useState("Health");
  const [selectedImg, setSelectedImg] = useState<string>(categories[0].img);

  return (
    <div className="w-full max-w-[777px] mt-[50px]">
      <ul className="font-roboto font-semibold text-[22px] flex gap-[10px] md:flex-col md:items-center">
        {categories.map((category) => (
          <li
            key={category.name}
            onClick={() => {
              setSelectedImg(category.img);
              setSelectedCategory(category.name);
            }}
            className={twMerge(
              `px-[55px] py-[21px] rounded-lg duration-200 cursor-pointer dark:text-black md:w-full md:text-center ${
                selectedCategory === category.name
                  ? "bg-main"
                  : "bg-[#91C788]/30 dark:bg-[#DEEEDB]"
              }`
            )}
          >
            {category.name}
          </li>
        ))}
      </ul>
      <p className="mt-[30px] font-light text-[18px] text-gray dark:text-whiteDark ">
        {
          categories.find((category) => category.name === selectedCategory)
            ?.description
        }
      </p>
      <div className="w-full h-auto rounded-lg mt-[30px] bg-white border border-whiteDark overflow-hidden">
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
