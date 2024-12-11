export default function UserItemSkeleton() {
  return (
    <div className="flex gap-[10px] items-center p-2 rounded-[8px]">
      <div className="flex animate-pulse items-center justify-center w-[50px] min-w-[50px] h-[50px] rounded bg-whiteDark dark:bg-gray" />
      <div className="w-full">
        <div className="animate-pulse items-center justify-center w-10 h-4 rounded bg-whiteDark dark:bg-gray mb-1" />
        <div className="animate-pulse items-center justify-center w-2/3 h-4 rounded bg-whiteDark dark:bg-gray" />
      </div>
    </div>
  );
}
