import styles from "./Header.module.scss";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useRef, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const query = searchParams.get("query");
  const location = useLocation();

  const searchRef = useRef<HTMLInputElement>(null);

  const logined = true; //for test
  const transparent = /^\/contents\/[a-zA-Z]+$/.test(location.pathname);

  useEffect(() => {
    if (!searchRef.current) return;
    searchRef.current.value = query ? query : "";
  }, [query]);

  const searchKeyDown = (e: React.KeyboardEvent) => {
    if (!searchRef.current) return;
    const searchText = searchRef.current.value;
    if (e.key === "Enter" && searchText) {
      navigate("/search?query=" + searchText);
    }
  };

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
                    defaultValue={query ? query : ""}
                    ref={searchRef}
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
                <button className={styles.loginButton}>로그인</button>
              </li>
              <li className={styles.loginLi}>
                <button className={styles.registerButton}>회원가입</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
