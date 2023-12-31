import { CurrentModalType } from "../pages/Layout";
import styles from "./Header.module.scss";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

type HeaderProps = {
  setCurrentModal: (modal: CurrentModalType) => void;
};

export default function Header({ setCurrentModal }: HeaderProps) {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const query = searchParams.get("query");
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");

  const logined = false; //for test
  const transparent = /^\/contents\/[a-zA-Z]+$/.test(location.pathname);

  useEffect(() => {
    setSearchInput(query ? query : "");
  }, [query]);

  const searchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchInput) {
      navigate("/search?query=" + searchInput);
    }
  };

  return (
    <header
      className={styles.header + (transparent ? " " + styles.transparent : "")}
    >
      <div>
        <div className={styles.headerDiv}>
          <ul>
            <li className={styles.logoLi}>
              <Link to="/">
                <img
                  className={styles.logoImg}
                  src={
                    "/src/assets/logo" + (transparent ? "_white" : "") + ".svg"
                  }
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
            {logined ? (
              <li className={styles.myProfileLi}>
                <Link to="/users/idididid">
                  <div>
                    <img src="/src/assets/user_default.jpg" />
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
