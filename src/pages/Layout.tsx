import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import { useEffect, useState } from "react";
import { getTest } from "../apis/test";

export type CurrentModalType = null | "signup" | "login" | "setting";

export default function Layout() {
  const [currentModal, setCurrentModal] = useState<CurrentModalType>(null);

  useEffect(() => {
    console.log(`-----sample connection check-------`);
    getTest()
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
        console.log(`-----sample connection complete-------`);
      });
  }, []);
  return (
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
  );
}
