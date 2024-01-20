import styles from "./SearchBar.module.scss";
import searchSmall from "../assets/searchSmall.svg";
import searchBig from "../assets/searchBig.svg";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function SearchBar({
  transparent,
  searchInput,
  setSearchInput,
}: {
  transparent: boolean;
  searchInput: string;
  setSearchInput: (newSearchInput: string) => void;
}) {
  const navigate = useNavigate();

  const searchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchInput) {
      navigate("/search?query=" + searchInput);
    }
  };

  const [showRecommend, setShowRecommend] = useState(false);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <li
      className={
        styles.searchBar + (transparent ? " " + styles.transparent : "")
      }
    >
      <div>
        <div>
          <label>
            <img
              className={transparent ? styles.searchBig : styles.searchSmall}
              src={transparent ? searchBig : searchSmall}
            />
            <input
              onBlur={() => setTimeout(() => setShowRecommend(false), 200)}
              onFocus={() => setShowRecommend(true)}
              autoComplete="off"
              placeholder="콘텐츠, 인물, 유저를 검색해보세요."
              type="text"
              value={searchInput}
              onChange={onSearchChange}
              onKeyDown={searchKeyDown}
            />
          </label>
        </div>
      </div>
      {showRecommend && (
        <div className={styles.recommend}>
          <section>
            {searchInput ? (
              <div className={styles.relatedHeader}>
                <h2>연관 검색어</h2>
              </div>
            ) : (
              <div className={styles.recentHeader}>
                <h2>최근 검색어</h2>
                <button>모두 삭제</button>
              </div>
            )}
          </section>
        </div>
      )}
    </li>
  );
}
