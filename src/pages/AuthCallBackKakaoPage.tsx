import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../apis/const";
import { defaultHandleResponse } from "../apis/custom";
export default function AuthCallBackKakaoPage() {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("code : ", code);
  const navigate = useNavigate();
  useEffect(() => {
    // 이 엔드포인트로 code를 보내고 최종적으로는 api 서버에서 발급한 access token을 받아온다.

    fetch(`${BASE_API_URL}/auth/kakao/login?code=${code}`)
      .then(defaultHandleResponse)
      .then((d) => {
        console.log(d);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <h1>여기는 리다이렉트 용 페이지 입니다.... 리다이렉트중</h1>
      <h1>여기는 리다이렉트 용 페이지 입니다.... 리다이렉트중</h1>
      <h1>여기는 리다이렉트 용 페이지 입니다.... 리다이렉트중</h1>
      <h1>여기는 리다이렉트 용 페이지 입니다.... 리다이렉트중</h1>
    </div>
  );
}
