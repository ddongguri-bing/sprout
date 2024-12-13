import { landingImages } from "../constants/images";
export default function main() {
  return (
    <div className="w-full text-black dark:text-white text-[14px] flex flex-col flex-1 justify-center items-center py-[30px]">
      <div className="w-[777px] flex flex-col gap-[50px]">
        <article className="flex gap-[20px]">
          <div>
            <h2 className="font-roboto text-[30px] font-bold">
              Together We Grow, <br />
              Together We Achieve
            </h2>
            <p className="text-gray dark:text-whiteDark mt-[20px]">
              건강, 공부, 독서, 요리, 자격증까지, 당신의 열정을 키울 수 있는
              공간, SPROUT
              <br /> 관심사를 공유하고 서로 격려하며 목표를 이루는 여정을
              함께하세요
            </p>
          </div>
          <img src={landingImages[0]} />
        </article>
        <div className="w-full px-[35px] pt-5 flex flex-col gap-[50px] items-center">
          <div className="flex flex-row-reverse gap-[50px] items-center">
            <div>
              <h3 className="font-roboto text-2xl font-semibold mb-[10px]">
                Health
              </h3>
              <p className="text-gray font-light dark:text-whiteDark">
                몸도 마음도 건강하게, 더 나은 하루를 만들어가요
              </p>
            </div>
            <img src={landingImages[1]} />
          </div>
          <div className="flex gap-[50px] items-center">
            <div className="">
              <h3 className="font-roboto text-2xl font-semibold mb-[10px]">
                Study, Reading
              </h3>
              <p className="text-gray font-light dark:text-whiteDark">
                같이 배우고 성장하는 공간에서 목표를 향해 함께 달려요
                <br /> 당신의 이야기를 공유하세요
              </p>
            </div>
            <img src={landingImages[2]} />
          </div>
          <div className="flex flex-row-reverse gap-[50px] items-center">
            <div className="flex flex-col">
              <h3 className="font-roboto text-2xl font-semibold mb-[10px]">
                Cooking
              </h3>
              <p className="text-gray font-light dark:text-whiteDark">
                맛있는 한 끼, 요리로 소통하는 즐거움을 발견하세요
              </p>
            </div>
            <img src={landingImages[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}
