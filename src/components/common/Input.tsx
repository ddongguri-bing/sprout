import { twMerge } from "tailwind-merge";

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type: "text" | "email" | "number" | "password" | "tel";
  theme?: "auth" | "setting";
};
export default function Input(props: InputProps) {
  const { className, theme, ...rest } = props;
  const AUTH_STYLE =
    "w-full py-[26px] px-[30px] border border-main rounded-[8px] focus:outline-none placeholder:text-gray  bg-white dark:bg-black text-black dark:text-white dark:placeholder:text-whiteDark";
  const SETTING_STYLE =
    "w-full max-w-[500px] h-[50px] rounded-[8px] border border-whiteDark dark:border-gray bg-white dark:bg-black text-black dark:text-white placeholder:text-gray dark:placeholder:text-whiteDark disabled:text-whiteDark dark:disabled:text-gray px-5";

  const handleGetStyle = (theme?: string) => {
    switch (theme) {
      case "auth":
        return AUTH_STYLE;
      case "setting":
        return SETTING_STYLE;
      default:
        return "";
    }
  };

  return (
    <>
      <input className={twMerge(handleGetStyle(theme), className)} {...rest} />
    </>
  );
}
