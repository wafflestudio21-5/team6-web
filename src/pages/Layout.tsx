import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import { useState, useEffect } from "react";
import { myUserDataRequest, newTokenRequest } from "../apis/auth";
import { useAuthContext } from "../contexts/authContext";
import { defaultHandleResponse } from "../apis/custom";
import SettingModal from "../components/user/SettingModal";

export type CurrentModalType = null | "signup" | "login" | "setting";
export type OutletContextType = {
  setCurrentModal: (currentModal: CurrentModalType) => void;
};

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
      })
      .catch(() => {
        console.log("토큰 받아오기 실패");
      })
      .finally(() => {
        setAutoLoginConfirmed(true);
      });
  }, []);

  // 로그인이 성공하여 엑세스 토큰을 얻으면 다음 코드가 실행
  useEffect(() => {
    accessToken &&
      myUserDataRequest(accessToken)
        .then(defaultHandleResponse)
        .then((data) => {
          setMyUserData(data);
        })
        .catch(() => {
          console.log("유저 데이터 받아오기 실패");
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
        {currentModal === "setting" && (
          <SettingModal setCurrentModal={setCurrentModal} />
        )}
        <Header setCurrentModal={setCurrentModal} />
        <section className={styles.mainSection}>
          <div className={styles.mainDiv}>
            <Outlet context={{ setCurrentModal } satisfies OutletContextType} />
            <Footer />
          </div>
        </section>
      </div>
    )
  );
}
