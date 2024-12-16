import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { getChannels, ChannelItem } from "../api/channel";
import { getPostsByChannelWithPagination } from "../api/board";
import { PostItem } from "../api/board";
import BoardItem from "../components/board/BoardItem";
import Button from "../components/common/Button";
import { useAuthStore } from "../stores/authStore";
// import Loading from "../components/common/Loading";
import BoardItemSkeleton from "../components/common/skeleton/BoardItemSkeleton";

export default function Board() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const channelId = params.get("id");

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [channelName, setChannelName] = useState<string | null>(null);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true); // 더 이상 가져올 게시물이 있는지 확인
  const [offset, setOffset] = useState(0);
  const limit = 6;

  const lastItemRef = useRef<HTMLDivElement | null>(null);

  // 채널 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchChannelData = async () => {
      if (channelId) {
        const channelData = await getChannels();
        const selectedChannel = channelData.find(
          (channel: ChannelItem) => channel._id === channelId
        );
        if (selectedChannel) {
          setChannelName(selectedChannel.name);
        }
      }
    };

    fetchChannelData();
  }, [channelId]);

  useEffect(() => {
    if (channelId) {
      setPosts([]); // 기존 게시글 초기화
      setOffset(0); // offset 초기화
      setHasMorePosts(true); // 더 이상 가져올 게시물이 있는지 상태 초기화
    }
  }, [channelId]);

  // 더 많은 데이터를 로드하는 함수
  const loadMoreItems = async () => {
    // 로딩 중이거나 더 이상 게시물이 없으면 추가로 로딩하지 않도록 처리
    if (isLoading || !hasMorePosts || !channelId) return;
    
    try {
      setIsLoading(true);
      if (channelId) {
        const postData = await getPostsByChannelWithPagination(
          channelId,
          offset,
          limit
        );
  
        // 기존 게시글과 중복되지 않는 게시글만 필터링
        const newPosts = postData.filter(
          (newPost: PostItem) => !posts.some((existingPost) => existingPost._id === newPost._id)
        );
  
        // 중복을 제외한 새 게시글만 상태에 추가
        if (newPosts.length > 0) {
          setPosts((prev) => [...prev, ...newPosts]);
          setOffset((prev) => prev + newPosts.length);  // 새로운 게시글만큼 offset 증가
        }
  
        // 가져온 데이터가 limit보다 적으면 더 이상 가져올 데이터가 없다고 설정
        if (postData.length < limit) {
          setHasMorePosts(false);
        }
      }
    } catch (error) {
      console.error("게시글 로딩 오류", error);
    } finally {
      setIsLoading(false);
    }
  };
  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && hasMorePosts) {
          loadMoreItems(); // 마지막 아이템이 보이면 추가 데이터를 로드
        }
      },
      {
        rootMargin: "680px", // 마지막 아이템이 화면에 680px 정도 가깝게 보이면 로드 시작
      }
    );
  
    if (lastItemRef.current) {
      observer.observe(lastItemRef.current); // 마지막 아이템을 관찰
    }
  
    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current); // 컴포넌트가 unmount되거나 다른 조건이 발생할 때 옵저버를 해제
      }
    };
  }, [isLoading, hasMorePosts, offset]);  // 상태 변화 시 observer를 새로 설정

  return (
    <div className="pb-[30px] flex flex-col">
      <div className="h-[100px] px-[30px] sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black border-b border-whiteDark dark:border-gray z-10">
        <h2 className="text-xl font-bold">{channelName}</h2>
        {isLoggedIn && (
          <Button
            to={`/board/${channelId}/create?name=${channelName}`}
            text="포스트 작성"
            size={"sm"}
          />
        )}
      </div>
      {posts.length === 0 && !isLoading && (
        <div className="flex justify-center mt-10">
          아직 게시글이 없어요. 첫 글을 작성해보세요! 🌱
        </div>
      )}
      {posts.map((post) => (
        <BoardItem
          key={post._id}
          post={post}
          isDetail={false}
          channelId={channelId!}
        />
      ))}
      {isLoading && <BoardItemSkeleton />}
      <div ref={lastItemRef}></div>
    </div>
  );
}
