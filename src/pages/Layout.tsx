import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import { useState } from "react";

export type CurrentModalType = null | "signup" | "login" | "setting";

export default function Layout() {
  const [currentModal, setCurrentModal] = useState<CurrentModalType>(null);

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
