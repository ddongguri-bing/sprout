import BoardGrid from "../components/BoardGrid";
import Button from "../components/Button";
import { getSpecificUser } from "../api/users";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Back from "../assets/back.svg";
import { getAuthUser } from "../api/auth";
import Avata from "../components/Avata";
import { deleteFollowDelete, postFollowCreate } from "../api/follow";
import { postNotification } from "../api/notification";

interface PostType {
  _id: string;
  channel: string;
  image: string;
}

interface SpecificUserType {
  _id: string;
  fullName: string;
  email: string;
  followers: string[];
  following: string[];
  posts: PostType[];
  image?: string;
}

interface LoggedInUserType {
  _id: string;
  followers: string[];
  following: any[];
}

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [specificUser, setSpecificUser] = useState<SpecificUserType | null>(
    null
  );
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUserType | null>(
    null
  );

  // 팔로우/팔로잉 기능
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollow, setIsFollow] = useState(false);
  const [followId, setFollowId] = useState<string | null>(null);

  const handleFollow = async () => {
    console.log("팔로우 버튼 누름!!!");
    // 로그인된 유저 정보가 없음 || 팔로우 대상의 정보가 없음 || 이미 팔로우 상태
    if (!loggedInUser || !specificUser || isFollow) return;
    if (specificUser.followers.includes(loggedInUser._id)) {
      console.log("이미 팔로잉 중입니다");
    }

    try {
      const response = await postFollowCreate(specificUser._id);

      setFollowerCount((prev) => prev + 1);
      setFollowId(response._id);
      setIsFollow(true);
      await postNotification({
        notificationType: "FOLLOW",
        notificationTypeId: response._id,
        userId: specificUser._id,
        postId: loggedInUser._id,
      });
    } catch (error) {
      console.error(`팔로우 실패` + error);
    }
  };

  const handleUnfollow = async () => {
    console.log("언팔로우 버튼 누름!!!");
    if (!followId) return;
    try {
      await deleteFollowDelete(followId);

      setFollowerCount((prev) => prev - 1);
      setFollowId(null);
      setIsFollow(false);
    } catch (error) {
      console.error(`언팔로우 실패` + error);
    }
  };

  // 특정 유저 불러오기
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

  useEffect(() => {
    fetchSpecificUser();

    // 현재 로그인한 유저 정보 가져오기
    const token = document.cookie.match(/token=([^ ]+)/)?.[1];
    const checkLoggedInUser = async (token: string) => {
      try {
        const loggedInUser = await getAuthUser(`Bearer ${token}`);
        setLoggedInUser(loggedInUser);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) checkLoggedInUser(token);
  }, [id]);

  // 팔로우/팔로잉 기능
  useEffect(() => {
    console.log("loggedInUser:", loggedInUser);
    console.log("specificUser:", specificUser);

    if (loggedInUser && specificUser) {
      console.log(specificUser);
      const isFollowing = loggedInUser.following.find((fu) => fu.user === id);
      if (!isFollowing) return;
      setIsFollow(!!isFollowing);
      setFollowId(isFollowing._id);
      setFollowerCount(specificUser.followers.length);
    }
  }, [loggedInUser, specificUser]);

  if (!specificUser) {
    return (
      <div className="font-bold text-[30px] text-main flex flex-col items-center justify-center h-full">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="h-[100px] px-[30px] z-[9] sticky top-0 left-0 flex justify-between items-center dark:text-white bg-white dark:bg-black border-b border-whiteDark dark:border-gray">
        <button onClick={() => navigate(-1)}>
          <img
            className="dark:invert dark:hover:fill-white"
            src={Back}
            alt="back icon"
          />
        </button>
      </div>
      <div className="py-[70px] px-[50px] text-black dark:text-white flex flex-col items-center">
        <div className="w-full max-w-[826px]">
          <div className="flex mb-[30px] items-end gap-[30px]">
            <Avata profile={specificUser.image} size={"lg"} />
            <div className="flex flex-col gap-[50px]">
              <div className="flex flex-col gap-[10px]">
                <h2 className="text-[22px] font-bold">
                  {specificUser.fullName}
                </h2>
                <p className="text-lg text-gray dark:text-whiteDark">
                  {specificUser.email}
                </p>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[30px]">
                  <div className="flex items-center gap-[10px]">
                    <span className="font-bold">팔로우</span>{" "}
                    <span className="text-gray dark:text-whiteDark">
                      {followerCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <span className="font-bold">팔로잉</span>{" "}
                    <span className="text-gray dark:text-whiteDark">
                      {specificUser.following.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <span className="font-bold">포스트</span>{" "}
                    <span className="text-gray dark:text-whiteDark">
                      {specificUser.posts.length}
                    </span>
                  </div>
                </div>
                {/* id가 내 id이면 프로필 수정 버튼 / 아니면 팔로잉 버튼 */}
                {loggedInUser?._id === specificUser._id ? (
                  <Button
                    to={`/user/edit`}
                    text={"프로필 수정"}
                    size={"md"}
                    className="max-w-[188px]"
                  />
                ) : (
                  <Button
                    text={isFollow ? "팔로우 끊기" : "팔로우"}
                    size={"md"}
                    className="max-w-[188px]"
                    onClick={isFollow ? handleUnfollow : handleFollow}
                  />
                )}
              </div>
            </div>
          </div>
          <BoardGrid posts={specificUser.posts} />
        </div>
      </div>
    </>
  );
}
