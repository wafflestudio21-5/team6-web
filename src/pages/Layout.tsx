import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import { useEffect, useState } from "react";
import { myUserDataRequest, newTokenRequest } from "../apis/auth";
import { useAuthContext } from "../contexts/authContext";
export type CurrentModalType = null | "signup" | "login" | "setting";

export default function Layout() {
  const [currentModal, setCurrentModal] = useState<CurrentModalType>(null);
  const [isLoginConfirmed, setIsLoginConfirmed] = useState(false);
  const { authData, setAuthData } = useAuthContext();

  // 자동 로그인
  useEffect(() => {
    newTokenRequest()
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error(`error : ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // 리프레시 토큰은 갱신, 엑세스 토큰이 받아와짐 <= 저번에 로그인했던 적이 있어 자동로그인이 된다는 뜻!
        const accessToken = data.access;
        setAuthData({ ...authData, accessToken });
        return myUserDataRequest(accessToken);
      })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error(`error : ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        setIsLoginConfirmed(true);
        console.log(`-----자동 로그인 로직 끝-------`);
      });
  }, []);

  return (
    isLoginConfirmed && (
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
