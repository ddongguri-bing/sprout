import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-full h-full inset-0 bg-black/50 fixed z-[99999] flex justify-center items-center">
      <FadeLoader
        color="#91C788"
        height={25}
        width={8}
        radius={10}
        margin={20}
      />
    </div>
  );
}
