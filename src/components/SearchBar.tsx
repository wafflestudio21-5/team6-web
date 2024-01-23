import styles from "./SearchBar.module.scss";
import searchSmall from "../assets/searchSmall.svg";
import searchBig from "../assets/searchBig.svg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getKeywordSearch } from "../apis/search";
import { defaultResponseHandler } from "../apis/custom";

export default function SearchBar({
  transparent,
  searchInput,
  setSearchInput,
}: {
  transparent: boolean;
  searchInput: string;
  setSearchInput: (newSearchInput: string) => void;
}) {
  const HISTORY_LOCAL_KEY = "RECENT_SEARCH_WORDS";
  const navigate = useNavigate();

  const [history, setHistory_] = useState<string[]>([]);
  const setHistory = (newHistory: string[]) => {
    localStorage.setItem(HISTORY_LOCAL_KEY, JSON.stringify(newHistory));
    setHistory_(newHistory);
  };

  const [related, setRelated] = useState<string[]>([]);

  const [showRecommend, setShowRecommend] = useState(false);

  const searchConfirm = (query: string) => {
    const exHistory = history.filter((str) => str != query);
    console.log(query, exHistory);
    if (exHistory.length == 3) {
      setHistory([query, exHistory[0], exHistory[1]]);
    } else {
      setHistory([query, ...exHistory]);
    }
    navigate("/search?query=" + query);
  };

  const searchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchInput) {
      searchConfirm(searchInput);
    }
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    getKeywordSearch(query)
      .then(defaultResponseHandler)
      .then((data) => {
        setRelated(data.map((obj: { title_ko: string }) => obj.title_ko));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const recentWords = localStorage.getItem(HISTORY_LOCAL_KEY);
    if (recentWords) {
      setHistory(JSON.parse(recentWords));
    }
  }, []);

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
      {showRecommend &&
        (searchInput
          ? related.length > 0 && (
              <div className={styles.recommend}>
                <section>
                  <div className={styles.relatedHeader}>
                    <h2>연관 검색어</h2>
                  </div>
                  <ul className={styles.recommendList}>
                    {related.map((str, id) => (
                      <li
                        onMouseDown={(e) => {
                          if (e.button === 0) searchConfirm(str);
                        }}
                        key={id}
                      >
                        {str}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )
          : history.length > 0 && (
              <div className={styles.recommend}>
                <section>
                  <div className={styles.recentHeader}>
                    <h2>최근 검색어</h2>
                    <button
                      onMouseDown={(e) => {
                        if (e.button === 0) setHistory([]);
                      }}
                    >
                      모두 삭제
                    </button>
                  </div>
                  <ul className={styles.recommendList}>
                    {history.map((str, id) => (
                      <li
                        onMouseDown={(e) => {
                          if (e.button === 0) searchConfirm(str);
                        }}
                        key={id}
                      >
                        {str}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ))}
    </li>
  );
}
