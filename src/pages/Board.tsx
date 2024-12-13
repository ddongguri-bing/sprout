import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getChannels, ChannelItem } from "../api/channel";
import { getPostsByChannel } from "../api/board";
import { PostItem } from "../api/board";
import BoardItem from "../components/board/BoardItem";
import Button from "../components/common/Button";
import { useAuthStore } from "../stores/authStore";

export default function Board() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const channelId = params.get("id");

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [channelName, setChannelName] = useState<string | null>(null);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const fetchPostsAndChannel = async () => {
      if (channelId) {
        const postsData = await getPostsByChannel(channelId);
        setPosts(postsData);
        const channelData = await getChannels();
        const selectedChannel = channelData.find(
          (channel: ChannelItem) => channel._id === channelId
        );
        if (selectedChannel) {
          setChannelName(selectedChannel.name);
        }
      }
    };

    fetchPostsAndChannel();
  }, [channelId]);

  return (
    <div className="pb-[30px] flex flex-col ">
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black border-b border-whiteDark dark:border-gray z-10">
        <h2 className="text-xl font-bold">{channelName}</h2>
        {/* 채널 이름 표시 */}
        {isLoggedIn && (
          <Button
            to={`/board/${channelId}/create`}
            text="포스트 작성"
            size={"sm"}
          />
        )}
      </div>
      {posts.map((post) => (
        <BoardItem
          key={post._id}
          post={post}
          isDetail={false}
          channelId={channelId!}
        />
      ))}
    </div>
  );
}
