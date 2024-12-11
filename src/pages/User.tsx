import BoardGrid from "../components/BoardGrid";
import Button from "../components/Button";
import { getUsers, getSpecificUser } from "../api/users";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function User() {
  const { id } = useParams();
  const [admin, setAdmin] = useState<any | null>(null);
  const [specificUser, setSpecificUser] = useState<any | null>(null);

  useEffect(() => {
    // api 문제 -> followers가 있는 admin 계정으로 테스트 하기 위함
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        const lastUser = data[data.length - 1];
        setAdmin(lastUser);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSpecificUser = async () => {
      try {
        if (id) {
          const user = await getSpecificUser(id);
          setSpecificUser(user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    fetchSpecificUser();
    console.log(admin);
  }, []);

  if (!specificUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-[70px] px-[50px] text-black dark:text-white flex flex-col items-center">
      <div className="w-full max-w-[826px]">
        <div className="flex mb-[30px] items-end gap-[30px]">
          <div className="w-[220px] h-[220px] bg-whiteDark rounded-[8px]"></div>
          <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-[22px] font-bold">{specificUser.fullName}</h2>
              <p className="text-lg text-gray dark:text-whiteDark">
                {specificUser.email}
              </p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex gap-[30px]">
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold">팔로우</span>{" "}
                  <span className="text-gray dark:text-whiteDark">
                    {admin.followers.length}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold">팔로잉</span>{" "}
                  <span className="text-gray dark:text-whiteDark">
                    {admin.following.length}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold">포스트</span>{" "}
                  <span className="text-gray dark:text-whiteDark">
                    {admin.posts.length}
                  </span>
                </div>
              </div>
              {/* id가 내 id이면 프로필 수정 버튼 / 아니면 팔로잉 버튼 */}
              <Button text={"팔로잉"} size={"md"} className="max-w-[188px]" />
            </div>
          </div>
        </div>
        <BoardGrid />
      </div>
    </div>
  );
}
