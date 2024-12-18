import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSearchPosts } from "../api/search";
import SearchBoardItem from "../components/search/SearchBoardItem";
import BoardItemSkeleton from "../components/common/skeleton/BoardItemSkeleton";

export default function Search() {
  const { query } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<SearchPostItem[]>([]);

  useEffect(() => {
    const handleSearch = async (query?: string) => {
      try {
        setLoading(true);
        const data = (await getSearchPosts(query)).filter(
          (post) => post.author
        );
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    handleSearch(query);
  }, [query]);

  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] sticky top-0 left-0 flex justify-center items-center bg-white dark:bg-black border-b border-whiteDark dark:border-gray z-[9]">
        <h2 className="w-[calc(100%-60px)] max-w-[777px] text-xl font-bold">
          {decodeURI(query || "")}
        </h2>
      </div>
      {loading ? (
        <BoardItemSkeleton />
      ) : posts.length ? (
        <>
          {posts.map((post) => (
            <SearchBoardItem key={`search-${post._id}`} post={post} />
          ))}
        </>
      ) : (
        <div className="w-[calc(100%-60px)] max-w-[777px] text-xl mx-auto mt-20 ">
          검색어{" "}
          <b className="text-4xl text-main">"{decodeURI(query || "")}"</b>에
          해당하는 포스트가 없습니다.
        </div>
      )}
    </div>
  );
}
