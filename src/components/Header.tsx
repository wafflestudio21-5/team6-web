import { CurrentModalType } from "../pages/Layout";
import Logo from "../assets/logo.svg";
import WhiteLogo from "../assets/logo_white.svg";
import profileDefault from "../assets/user_default.jpg";
import styles from "./Header.module.scss";
import SearchBar from "./SearchBar";
import searchSmall from "../assets/searchSmall.svg";
import searchBig from "../assets/searchBig.svg";
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useMediaQuery } from "react-responsive";

type HeaderProps = {
  setCurrentModal: (modal: CurrentModalType) => void;
};

function WidthBig({ children }: { children: React.ReactNode }) {
  const isBig = useMediaQuery({
    query: "(min-width:751px)",
  });

  return <>{isBig && children}</>;
}

function WidthSmall({ children }: { children: React.ReactNode }) {
  const isSmall = useMediaQuery({
    query: "(max-width:750px)",
  });

  return <>{isSmall && children}</>;
}

export default function Header({ setCurrentModal }: HeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const location = useLocation();
  const navigate = useNavigate();

  const { isLogined, myUserData } = useAuthContext();

  const [searchInput, setSearchInput] = useState("");
  const inContentPage = /^\/contents\/\d+$/.test(location.pathname);
  const [isScrollTop, setIsScrollTop] = useState(true);
  const transparent = inContentPage && isScrollTop;

  const handleScroll = () => {
    if (window.scrollY) {
      setIsScrollTop(false);
    } else {
      setIsScrollTop(true);
    }
  };

  const gotoSearch = () => {
    setSearchParams({});
    navigate("/search");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    setSearchInput(query ? query : "");
  }, [query]);

  /* const jsonData = {
    username: "frontTestId2",
    password: "frontpass123",
    password2: "frontpass123",
  };*/

  return (
    <header
      className={styles.header + (transparent ? " " + styles.transparent : "")}
    >
      <div className={styles.headerDiv}>
        <ul>
          <li className={styles.logoLi}>
            <Link to="/">
              <img
                className={styles.logoImg}
                src={inContentPage && isScrollTop ? WhiteLogo : Logo}
                alt="왓챠피디아 로고"
              />
            </Link>
          </li>
          <WidthBig>
            <SearchBar
              transparent={transparent}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </WidthBig>
          <WidthSmall>
            <li className={styles.searchButton} onClick={gotoSearch}>
              <div>
                <img src={transparent ? searchBig : searchSmall} />
              </div>
            </li>
          </WidthSmall>
          {isLogined ? (
            <li className={styles.myProfileLi}>
              <Link to={`/users/${myUserData?.id}`}>
                <div>
                  <img src={myUserData?.profile_photo ?? profileDefault} />
                </div>
              </Link>
            </li>
          ) : (
            <>
              <li className={styles.loginLi}>
                <button
                  className={styles.loginButton}
                  onClick={() => {
                    setCurrentModal("login");
                  }}
                >
                  로그인
                </button>
              </li>
              <li className={styles.loginLi}>
                <button
                  className={styles.registerButton}
                  onClick={() => {
                    setCurrentModal("signup");
                  }}
                >
                  회원가입
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
