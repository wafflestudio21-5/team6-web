import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import { useState, useEffect } from "react";
import { myUserDataRequest, newTokenRequest } from "../apis/auth";
import { useAuthContext } from "../contexts/authContext";
import { defaultHandleResponse } from "../apis/custom";
export type CurrentModalType = null | "signup" | "login" | "setting";

export default function Layout() {
  const [currentModal, setCurrentModal] = useState<CurrentModalType>(null);

  const {
    setMyUserData,
    setAccessToken,
    accessToken,
    autoLoginConfirmed,
    setAutoLoginConfirmed,
  } = useAuthContext();

  // 자동 로그인 로직
  useEffect(() => {
    newTokenRequest()
      .then(defaultHandleResponse)
      .then((data) => {
        // 리프레시 토큰은 쿠키에서 갱신되고 엑세스 토큰이 data로 받아와진다.
        const accessToken = data.access;
        setAccessToken(accessToken);
      });
    setAutoLoginConfirmed(true);
  }, []);

  // 로그인이 성공하여 엑세스 토큰을 얻으면 다음 코드가 실행
  useEffect(() => {
    accessToken &&
      myUserDataRequest(accessToken)
        .then(defaultHandleResponse)
        .then((data) => {
          setMyUserData(data);
        });
  }, [accessToken]);

  return (
    autoLoginConfirmed && (
      <div>
        {currentModal === "signup" && (
          <SignupModal setCurrentModal={setCurrentModal} />
        )}
        {currentModal === "login" && (
          <LoginModal setCurrentModal={setCurrentModal} />
        )}
        <Header setCurrentModal={setCurrentModal} />
        <Outlet />
        <Footer />
      </div>
    )
  );
}
