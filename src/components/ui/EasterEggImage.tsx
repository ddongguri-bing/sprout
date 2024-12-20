import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import { FadeLoader } from "react-spinners";
import easterEggs from "../../constants/easterEggs";

const OPEN_API_CAT = "https://cataas.com";
const OPEN_API_DOG = "https://dog.ceo/api/breeds/image/random";

export default function EasterEggImage({ easterEgg }: { easterEgg: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const handlefetchImage = async () => {
      try {
        setLoading(true);
        const params = { json: true };
        const isCat = easterEgg === easterEggs[1];
        const OPEN_API = isCat
          ? `${OPEN_API_CAT}/cat/says/DEV_COURSE_FIGHTING`
          : OPEN_API_DOG;
        const { data } = await axios.get(OPEN_API, {
          params: isCat ? params : undefined,
        });

        setUrl(
          isCat
            ? `${OPEN_API_CAT}/cat/${data._id}/says/DEV_COURSE_FIGHTING`
            : data.message
        );
      } catch (err) {
        console.error(err);
      }
    };
    handlefetchImage();
  }, [trigger]);

  return (
    <>
      <div className="w-[calc(100%-40px)] relative mb-5 min-h-20">
        {url && (
          <img
            className="w-full max-w-[500px] max-h-[70vh]"
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
