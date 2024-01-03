import styles from "./Header.module.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const query = searchParams.get("query");

  const [searchText, setSearchText] = useState(query ? query : "");

  // useEffect(() => {
  //   setSearchText(query ? query : "");
  // }, [query]);

  const searchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchText) {
      navigate("/search?query=" + searchText);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <ul>
          <li className={styles.logoLi}>
            <Link to="/">
              <img
                className={styles.logoImg}
                src="/src/assets/logo.svg"
                alt="왓챠피디아 로고"
              />
            </Link>
          </li>
          <li className={styles.searchLi}>
            <div>
              <div>
                <form action="#">
                  <label>
                    <input
                      autoComplete="off"
                      placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요."
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={searchKeyDown}
                    />
                  </label>
                </form>
              </div>
            </div>
          </li>
          <li className={styles.loginLi}>
            <button className={styles.loginButton}>로그인</button>
          </li>
          <li className={styles.loginLi}>
            <button className={styles.registerButton}>회원가입</button>
          </li>
        </ul>
      </div>
    </header>
  );
}
