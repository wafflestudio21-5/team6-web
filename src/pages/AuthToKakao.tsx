import { useEffect } from "react";
import { KAKAO_AUTH_URL } from "../apis/const";

export default function AuthToKaKao() {
  useEffect(() => {
    window.location.href = KAKAO_AUTH_URL;
  }, []);
  return <></>;
}
