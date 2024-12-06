import { Link } from "react-router";
import BeforeUserBox from "./BeforeUserBox";
import UserItem from "./UserItem";
import { useState } from "react";
import AfterUserBox from "./AfterUserBox";

export default function Aside() {
  const isLoggedIn = true;
  return (
    <aside className="w-[257px] max-h-screen sticky text-black top-0 right-0 border-l border-whiteDark pt-[22px] pb-[17px] px-[32px] ">
      <div className="h-[calc(100vh-39px)] max-h-[calc(100vh-39px)] flex flex-col gap-[20px] justify-between">
        {isLoggedIn ? (
          <div className="flex flex-col gap-5">
            <AfterUserBox />
            <div className="">
              <h2 className="font-bold mb-5">알림</h2>
              <div className="h-full max-full min-h-[100px] overflow-y-auto">
                <ul className="flex flex-col gap-5  mb-[30px]"></ul>
              </div>
            </div>
          </div>
        ) : (
          <BeforeUserBox />
        )}
        <div className="gap-5 border-t border-whiteDark">
          <div className="py-5 ">
            <h2 className="font-bold mb-5">사용자</h2>
            <div className="overflow-y-auto ">
              <ul className="flex flex-col gap-5  mb-[30px]">
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
              </ul>
            </div>
            <Link
              to={"/"}
              className="w-full h-[42px] flex items-center justify-center bg-main text-[12px] font-medium rounded-[8px]"
            >
              더보기
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
