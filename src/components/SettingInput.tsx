type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type: "text" | "email" | "number" | "password" | "tel";
};
export default function SettingInput(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <input
      className="w-full max-w-[500px] h-[50px] rounded-[8px] border border-whiteDark dark:border-gray bg-white dark:bg-black text-black dark:text-white placeholder:text-gray dark:placeholder:text-whiteDark disabled:text-whiteDark dark:disabled:text-gray px-5"
      {...rest}
    />
  );
}
