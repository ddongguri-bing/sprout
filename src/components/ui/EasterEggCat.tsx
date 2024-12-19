import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import { FadeLoader } from "react-spinners";

export default function EasterEggCat() {
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const fetchCat = async () => {
      setLoading(true);
      const OPEN_API_DOMAIN = "https://cataas.com";
      const { data } = await axios.get(
        `${OPEN_API_DOMAIN}/cat/says/DEV_COURSE_FIGHTING`,
        { params: { json: true } }
      );
      setUrl(`${OPEN_API_DOMAIN}/cat/${data._id}/says/DEV_COURSE_FIGHTING`);
    };
    fetchCat();
  }, [trigger]);

  return (
    <>
      <div className="relative mb-5">
        {url && (
          <img
            className="max-w-[500px] max-h-[600px]"
            src={url}
            alt="dog"
            onLoad={() => setLoading(false)}
          />
        )}
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full min-h-20 bg-black/40 flex items-center justify-center">
            <FadeLoader
              color="#91C788"
              height={20}
              width={8}
              radius={10}
              margin={10}
            />
          </div>
        )}
      </div>
      <Button
        onClick={() => setTrigger((prev) => !prev)}
        size="sm"
        text="다른 고양이"
      />
    </>
  );
}
