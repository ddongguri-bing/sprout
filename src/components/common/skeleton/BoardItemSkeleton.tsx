export default function BoardItemSkeleton() {
  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="w-full max-w-[777px] flex flex-col items-start gap-5">
        <div className="w-full flex gap-[10px] items-center rounded-[8px]">
          <div className="flex animate-pulse items-center justify-center w-[75px] min-w-[75px] h-[75px] rounded bg-whiteDark dark:bg-gray" />
          <div className="w-full">
            <div className="animate-pulse items-center justify-center w-10 h-4 rounded bg-whiteDark dark:bg-gray mb-1" />
            <div className="animate-pulse items-center justify-center w-2/3 h-4 rounded bg-whiteDark dark:bg-gray" />
          </div>
        </div>
        <div className="w-full pl-[89px]">
          <div className="animate-pulse items-center justify-center w-full h-4 rounded bg-whiteDark dark:bg-gray mb-1" />
          <div className="animate-pulse items-center justify-center w-full h-4 rounded bg-whiteDark dark:bg-gray" />
        </div>
      </div>
    </div>
  );
}
