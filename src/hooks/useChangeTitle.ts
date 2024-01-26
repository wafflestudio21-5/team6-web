import { useEffect, useState } from "react";

export default function useChangeTitle() {
  const [title, setTitle] = useState("와플피디아 - 영화 평가 서비스");
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "와플피디아 - 영화 평가 서비스";
    };
  }, [title]);
  // change
  return { title, setTitle };
}
