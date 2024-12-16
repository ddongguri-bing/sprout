import BoardGrid from "../components/user/BoardGrid";
import Button from "../components/common/Button";
import { getSpecificUser } from "../api/users";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Avata from "../components/common/Avata";
import { deleteFollowDelete, postFollowCreate } from "../api/follow";
import { postNotification } from "../api/notification";
import { useModal } from "../stores/modalStore";
import images from "../constants/images";
import { useAuthStore } from "../stores/authStore";
import FollowList from "../components/user/FollowList";
import SendMessage from "../components/user/SendMessage";
import ChatMessage from "../components/user/ChatMessage";
import Loading from "../components/common/Loading";
import { getMessage, postMessage } from "../api/message";

interface PostType {
  _id: string;
  channel: string;
  image: string;
  title: string;
}

export interface SpecificUserType {
  _id: string;
  fullName: string;
  email: string;
  followers: {
    _id: string;
    user: string;
    follower: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  following: {
    _id: string;
    user: string;
    follower: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  posts: PostType[];
  image?: string;
}

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [specificUser, setSpecificUser] = useState<SpecificUserType | null>(
    null
  );
  const [followList, setFollowList] = useState<
    { _id: string; fullName: string; email: string; image: string }[]
  >([]);
  const loggedInUser = useAuthStore((state) => state.user);

  // 팔로우/팔로잉 기능
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollow, setIsFollow] = useState(false);
  const [followId, setFollowId] = useState<string | null>(null);
  const setOpen = useModal((state) => state.setModalOpen);

  // FollowList 모달 관리
  const [isFollowListOpen, setFollowListOpen] = useState(false);
  const [followListType, setFollowListType] = useState<
    "followers" | "following"
  >("followers");
  const [loadingFollowList, setLoadingFollowList] = useState(false);
  const toggleFollowList = () => setFollowListOpen((prev) => !prev);

  const fetchUserDetails = async (userId: string) => {
    try {
      const user = await getSpecificUser(userId);
      return {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
      };
    } catch (error) {
      return {
        _id: userId,
        fullName: "알 수 없는 사용자",
        email: "",
        image: "Avatar",
      };
    }
  };

  const loadFollowList = async () => {
    if (!specificUser) return;
    setLoadingFollowList(true);
    setFollowList([]);

    try {
      if (followListType === "followers") {
        const followers = await Promise.all(
          specificUser.followers.map(async (f) => fetchUserDetails(f.follower))
        );
        setFollowList(followers);
      } else {
        const following = await Promise.all(
          specificUser.following.map(async (f) => fetchUserDetails(f.user))
        );
        setFollowList(following);
      }
    } catch (error) {
      console.error("팔로우/팔로잉 목록 로드 실패", error);
    } finally {
      setLoadingFollowList(false);
    }
  };

  // 로그인 전 팔로우 버튼 누르면 모달
  const handleOpenModal = () => {
    setOpen(true, {
      message: "로그인 후 팔로우 해주세요!",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);
        navigate("/auth/signIn");
      },
    });
  };

  const handleFollow = async () => {
    // 로그인된 유저 정보가 없음 || 팔로우 대상의 정보가 없음 || 이미 팔로우 상태
    if (!loggedInUser) return handleOpenModal();
    if (!specificUser || isFollow) return;

    try {
      const response = await postFollowCreate(specificUser._id);

      setFollowerCount((prev) => prev + 1);
      setFollowId(response._id);
      setIsFollow(true);
      if (loggedInUser._id !== specificUser._id)
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

  const fetchSpecificUser = async () => {
    try {
      if (!id) return;
      const user = await getSpecificUser(id);
      setSpecificUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSpecificUser();
  }, [id]);

  useEffect(() => {
    if (isFollowListOpen) {
      loadFollowList();
    }
  }, [isFollowListOpen, followListType]);

  useEffect(() => {
    if (loggedInUser && specificUser) {
      const isFollowing = specificUser.followers.find(
        (fu) => fu.follower === loggedInUser._id
      );
      if (isFollowing) {
        setIsFollow(!!isFollowing);
        setFollowId(isFollowing._id);
      } else {
        setIsFollow(false);
        setFollowId(null);
      }
      setFollowerCount(specificUser.followers.length);
    }
  }, [loggedInUser, specificUser]);

  // URL 변경 시 모달 닫기
  useEffect(() => {
    if (isFollowListOpen) {
      setFollowListOpen(false);
    }
  }, [location]);

  //* Message */
  const [loadingChatList, setLoadingChatList] = useState(false);
  const [msgOpen, setMsgOpen] = useState<boolean>(false);
  const [type, setType] = useState<"SEND" | "CHAT">("SEND");
  const handleClickMsg = (type: "SEND" | "CHAT") => {
    if (!loggedInUser) return handleOpenModal();
    setMsgOpen((prev) => !prev);
    setType(type);

    if (type === "CHAT") {
      handleReceiveMsg();
    }
  };

  //handleOpenModal 문구를 "로그인 후 이용해주세요"로 통일하고 하나로 써도 될 듯
  const handleOpenMsgModal = () => {
    setOpen(true, {
      message: "로그인 후 메시지를 보내세요!",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);
        navigate("/auth/signIn");
      },
    });
  };

  const [msgContent, setMsgContent] = useState<string>("");
  const [response, setResponse] = useState<
    {
      message: string;
      createdAt: string;
      fullName: string;
      _id: string;
    }[]
  >([]);

  const handleSendMsg = async () => {
    if (!loggedInUser) return handleOpenMsgModal();
    if (!specificUser) return;

    try {
      const { data } = await postMessage({
        message: msgContent,
        receiver: specificUser._id,
      });
      setMsgContent("");
      return data;
    } catch (error) {
      console.error(`메시지 전송 실패` + error);
    }
  };

  const handleReceiveMsg = async () => {
    if (!loggedInUser) return handleOpenMsgModal();
    setLoadingChatList(true);
    try {
      const { data } = await getMessage();
      const userMsg = data.filter(
        (msg) => msg.receiver._id === loggedInUser._id
      );
      const uniqueUsers = userMsg.filter(
        (msg, index, self) =>
          self.findIndex((m) => m.sender._id === msg.sender._id) === index
      );

      setResponse(
        uniqueUsers.map((msg) => ({
          message: msg.message,
          createdAt: msg.createdAt,
          fullName: msg.sender.fullName,
          _id: msg.sender._id,
        }))
      );
    } catch (error) {
      console.error(`메시지 수신 실패` + error);
    } finally {
      setLoadingChatList(false);
    }
  };

  if (!specificUser) return <Loading />;
  const isMyPage = loggedInUser?._id === specificUser._id;
  const followBtnTxt = isMyPage
    ? "프로필 수정"
    : isFollow
    ? "팔로우 끊기"
    : "팔로우";

  const handleClickFollow = isMyPage
    ? undefined
    : isFollow
    ? handleUnfollow
    : handleFollow;
  return (
    <>
      <div className="h-[100px] px-[30px] z-[9] sticky top-0 left-0 flex justify-between items-center dark:text-white bg-white dark:bg-black border-b border-whiteDark dark:border-gray">
        <button onClick={() => navigate(-1)}>
          <img
            className="dark:invert dark:hover:fill-white"
            src={images.Back}
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
                  <div
                    className="flex items-center gap-[10px]"
                    onClick={() => {
                      setFollowListType("followers");
                      toggleFollowList();
                    }}
                  >
                    <span className="">팔로우</span>{" "}
                    <span className="text-gray dark:text-whiteDark font-bold">
                      {followerCount}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-[10px]"
                    onClick={() => {
                      setFollowListType("following");
                      toggleFollowList();
                    }}
                  >
                    <span className="">팔로잉</span>{" "}
                    <span className="text-gray dark:text-whiteDark font-bold">
                      {specificUser.following.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <span>포스트</span>{" "}
                    <span className="text-gray dark:text-whiteDark font-bold ">
                      {specificUser.posts.length}
                    </span>
                  </div>
                </div>

                {/* id가 내 id이면 프로필 수정 버튼 / 아니면 팔로잉 버튼 */}
                <div className="flex gap-[30px] items-center">
                  <Button
                    to={isMyPage ? `/user/edit` : undefined}
                    text={followBtnTxt}
                    size={"md"}
                    className="max-w-[188px]"
                    onClick={handleClickFollow}
                    theme={followBtnTxt === "팔로우 끊기" ? "sub" : "main"}
                  />
                  <button
                    type="button"
                    onClick={() => handleClickMsg(isMyPage ? "CHAT" : "SEND")}
                  >
                    <img
                      className="w-[25px] h-[25px] dark:invert dark:hover:fill-white"
                      src={
                        isMyPage ? images.MessageBoxBtn : images.MessageSendBtn
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <BoardGrid posts={specificUser.posts} />
        </div>
      </div>
      {isFollowListOpen && (
        <FollowList
          users={followList}
          title={followListType === "followers" ? "팔로워" : "팔로잉"}
          loading={loadingFollowList}
          toggleOpen={toggleFollowList}
        />
      )}
      {msgOpen && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-[9999]">
          {type === "SEND" && (
            <SendMessage
              onClose={() => {
                setMsgOpen(false);
              }}
              msgValue={msgContent}
              onMsgChange={setMsgContent}
              onSend={() => {
                setMsgOpen(false);
                handleSendMsg();
              }}
              receiver={specificUser.fullName}
            />
          )}
          {type === "CHAT" && (
            <ChatMessage
              onClose={() => setMsgOpen(false)}
              users={response}
              loading={loadingChatList}
            />
          )}
        </div>
      )}
    </>
  );
}
