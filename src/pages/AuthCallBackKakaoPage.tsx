import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { defaultResponseHandler } from "../apis/custom";
import { getKakaoAutoCallback } from "../apis/auth";
export default function AuthCallBackKakaoPage() {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("code : ", code);
  // const navigate = useNavigate();
  useEffect(() => {
    // 이 엔드포인트로 code를 보내고 최종적으로는 api 서버에서 발급한 access token을 받아온다.
    getKakaoAutoCallback(code)
      .then(defaultResponseHandler)
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        window.close();
        window.opener.location.reload();
      });
  }, []);

  return <></>;
}
