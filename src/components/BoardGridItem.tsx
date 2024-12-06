import { Link } from "react-router";

export default function BoardGridItem() {
  return (
    <Link
      to="/board/1/1"
      className="w-[calc(33.3333%-6px)] h-[17.75vw] mb-2 [&:nth-of-type(3n+1)]:mr-2 [&:nth-of-type(3n+2)]:mr-2 max-h-[270px] rounded-[8px] bg-whiteDark inline-block"
    >
      BoardGridItem
    </Link>
  );
}
