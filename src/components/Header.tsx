import { CurrentModalType } from "../pages/Layout";
import Logo from "../assets/logo.svg";
import WhiteLogo from "../assets/logo_white.svg";
import UserImage from "../assets/user_default.jpg";
import styles from "./Header.module.scss";
// import { newTokenRequest } from "../apis/auth";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
// import { myUserDataRequest } from "../apis/auth";
import { useAuthContext } from "../contexts/authContext";

type HeaderProps = {
  setCurrentModal: (modal: CurrentModalType) => void;
};

export default function Header({ setCurrentModal }: HeaderProps) {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const query = searchParams.get("query");
  const location = useLocation();

  const { isLogined, myUserData, accessToken } = useAuthContext();

  const [searchInput, setSearchInput] = useState("");
  const inContentPage = /^\/contents\/[a-zA-Z]+$/.test(location.pathname);
  const [isScrollTop, setIsScrollTop] = useState(true);

  const handleScroll = () => {
    if (window.scrollY) {
      setIsScrollTop(false);
    } else {
      setIsScrollTop(true);
    }
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

  const searchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchInput) {
      navigate("/search?query=" + searchInput);
    }
  };

  /* const jsonData = {
    username: "frontTestId2",
    password: "frontpass123",
    password2: "frontpass123",
  };*/

  return (
    <header
      className={
        styles.header +
        (inContentPage && isScrollTop ? " " + styles.transparent : "")
      }
    >
      <div>
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
            <li className={styles.searchLi}>
              <div>
                <div>
                  <label>
                    <input
                      autoComplete="off"
                      placeholder="콘텐츠, 인물, 유저를 검색해보세요."
                      type="text"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                      }}
                      onKeyDown={searchKeyDown}
                    />
                  </label>
                </div>
              </div>
            </li>
            <button
              onClick={() => {
                console.log(myUserData, accessToken);
              }}
            >
              my user data (콘솔로 확인)
            </button>

            {isLogined ? (
              <li className={styles.myProfileLi}>
                <Link to={`/users/${myUserData?.id}`}>
                  <div>
                    <img src={UserImage} />
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
      </div>
    </header>
  );
}
