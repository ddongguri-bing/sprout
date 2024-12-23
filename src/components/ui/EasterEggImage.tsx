import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import easterEggs from "../../constants/easterEggs";
import Loading from "../common/Loading";
import { useModal } from "../../stores/modalStore";

const OPEN_API_CAT = "https://cataas.com";
const OPEN_API_DOG = "https://dog.ceo/api/breeds/image/random";

export default function EasterEggImage({
  easterEgg,
  onClose,
}: {
  easterEgg: string;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

  const setModalOpen = useModal((state) => state.setModalOpen);

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
        setLoading(false);
        setModalOpen(true, {
          message: "API 호출 중 에러가 발생했습니다",
          isOneBtn: true,
          btnText: "확인",
          btnColor: "red",
          onClick: async () => {
            setModalOpen(false);
            onClose();
          },
        });
      }
    };
    handlefetchImage();
  }, [trigger]);

  return (
    <>
      <div className="w-[calc(100%-40px)] relative mb-5 min-h-20 flex items-center justify-center">
        {url && (
          <img
            className="w-full max-w-[500px] max-h-[70vh]"
            src={url}
            alt="dog"
            onLoad={() => setLoading(false)}
          />
        )}
        {loading && <Loading />}
      </div>
      <Button
        onClick={() => setTrigger((prev) => !prev)}
        size="sm"
        text={`다른 ${easterEgg}`}
      />
    </>
  );
}
