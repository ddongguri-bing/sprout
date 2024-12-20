import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getSearchPosts } from "../api/search";
import SearchBoardItem from "../components/search/SearchBoardItem";
import BoardItemSkeleton from "../components/common/skeleton/BoardItemSkeleton";
import EasterEgg from "../components/ui/EasterEgg";
import easterEggs from "../constants/easterEggs";

export default function Search() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("query");
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<SearchPostItem[]>([]);
  const [isEasterEgg, setIsEasterEgg] = useState<boolean>(false);
  const [easterEgg, setEasterEgg] = useState<string | null>(null);

  useEffect(() => {
    const handleSearch = async (query: string | null) => {
      if (!query) {
        setPosts([]);
        setLoading(false);
        setIsEasterEgg(false);
        setEasterEgg(null);
        return;
      }

      if (easterEggs.includes(query.toLowerCase())) {
        setIsEasterEgg(true);
        setEasterEgg(query);
      } else {
        setIsEasterEgg(false);
        setEasterEgg(null);
      }

      try {
        setLoading(true);
        const data = (await getSearchPosts(query)).filter(
          (post) => post.author
        );
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
      <div className="h-[100px] sticky top-0 left-0 flex justify-center items-center md:hidden bg-white dark:bg-black border-b border-whiteDark dark:border-gray z-[9]">
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
      ) : !query ? (
        <div className="w-[calc(100%-60px)] max-w-[777px] text-xl mx-auto md:mt-10 mt-20 ">
          <b className="md:text-2xl text-4xl text-main">검색어</b>를
          입력해주세요.
        </div>
      ) : (
        <div className="w-[calc(100%-60px)] max-w-[777px] text-xl mx-auto mt-20 ">
          검색어
          <b className="text-4xl text-main">"{decodeURI(query || "")}"</b>에
          해당하는 포스트가 없습니다.
        </div>
      )}
      {isEasterEgg && easterEgg && (
        <EasterEgg
          easterEgg={easterEgg}
          onClose={() => setIsEasterEgg(false)}
        />
      )}
    </div>
  );
}
