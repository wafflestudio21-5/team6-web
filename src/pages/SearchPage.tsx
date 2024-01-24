import { useSearchParams } from "react-router-dom";
import styles from "./SearchPage.module.scss";

export default function SearchPage() {
  const [searchParams, setSearchParams_] = useSearchParams();
  const query = searchParams.get("query");
  const category_ = searchParams.get("category");
  const category = category_ == "users" ? "users" : "movie";

  const setCategory = (newCategory: string) => {
    setSearchParams_({
      ...Object.fromEntries(searchParams.entries()),
      category: newCategory,
    });
  };
  return (
    <section className={styles.searchPage}>
      <div className={styles.searchHeader}>
        <div>"{query}"의 검색결과</div>
      </div>
      <div className={styles.navBar}>
        <ul>
          <li
            className={category == "movie" ? styles.selected : ""}
            onClick={() => setCategory("movie")}
          >
            영화
          </li>
          <li
            className={category == "users" ? styles.selected : ""}
            onClick={() => setCategory("users")}
          >
            유저
          </li>
        </ul>
      </div>
    </section>
  );
}
