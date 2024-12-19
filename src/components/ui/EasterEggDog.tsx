import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import { FadeLoader } from "react-spinners";

export default function EasterEggDog() {
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const fetchDog = async () => {
      try {
        setLoading(true);
        const OPEN_API_DOMAIN = "https://dog.ceo/api/breeds/image/random";
        const { data } = await axios.get(OPEN_API_DOMAIN);
        setUrl(data.message);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDog();
  }, [trigger]);

  return (
    <>
      <div className="relative mb-5">
        {url && (
          <img
            className="max-w-[500px]"
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
        text="다른 강아지"
      />
    </>
  );
}
