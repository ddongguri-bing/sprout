import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { categories } from "../../constants/main";
import Slider from "react-slick";
export default function MainContents() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedImg, setSelectedImg] = useState<string>(categories[0].img);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    afterChange: (current: number) => {
      setSelectedCategory(categories[current].name);
      setSelectedImg(categories[current].img);
    },
  };

  return (
    <div className="w-full max-w-[777px] mt-[50px] md:mt-[30px]">
      <ul
        className={twMerge(
          "font-roboto font-semibold text-[22px] flex gap-[10px] md:items-center",
          "md:text-[16px]"
        )}>
        {categories.map((category, index) => (
          <li
            key={category.name}
            onClick={() => {
              sliderRef.current?.slickGoTo(index);
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
          <Slider ref={sliderRef} {...settings}>
            {categories.map((category) => (
              <div key={category.name}>
                <img
                  src={category.img}
                  alt={category.name}
                  className="bg-white w-auto h-full object-contain mx-auto"
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
