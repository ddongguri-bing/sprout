import { useParams } from "react-router";
import BoardItem from "../components/BoardItem";
import { useEffect, useState } from "react";
import { handleSearchPost } from "../api/search";

export default function Search() {
  const { query } = useParams();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const handleSearch = async (query?: string) => {
      const { data } = await handleSearchPost(query);
      setPosts(data);
    };
    handleSearch(query);
  }, [query]);
  return (
    <div className="pb-[30px] flex flex-col relative">
      <div className="h-[100px] sticky top-0 left-0 flex justify-center items-center bg-white border-b border-whiteDark">
        <h2 className="w-full max-w-[777px] text-xl font-bold">
          {decodeURI(query || "")}
        </h2>
      </div>
      {posts.length ? (
        <>
          {posts.map((post) => (
            <BoardItem key={post._id} />
          ))}
        </>
      ) : (
        <div className="w-full max-w-[777px] text-xl mx-auto mt-20 ">
          검색어{" "}
          <b className="text-4xl text-main">"{decodeURI(query || "")}"</b>에
          해당하는 포스트가 없습니다.
        </div>
      )}
    </div>
  );
}
