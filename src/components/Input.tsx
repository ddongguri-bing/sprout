import { twMerge } from "tailwind-merge";

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type: "text" | "email" | "number" | "password" | "tel";
};
export default function Input(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <>
      <input
        className={twMerge(
          "w-full py-[26px] px-[30px] border border-main rounded-[8px] focus:outline-none placeholder:text-gray  bg-white dark:bg-black text-black dark:text-white dark:placeholder:text-whiteDark",
          className
        )}
        {...rest}
      />
    </>
  );
}
