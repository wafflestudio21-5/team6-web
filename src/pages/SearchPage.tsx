import { useSearchParams } from "react-router-dom";
import styles from "./SearchPage.module.scss";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchMovieList, {
  SearchMovieType,
} from "../components/SearchMovieList";
import { defaultResponseHandler } from "../apis/custom";
import { getSearch } from "../apis/search";
import SearchUserList, { SearchUserType } from "../components/SearchUserList";

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
  const [searchInput, setSearchInput] = useState("");

  const [movies, setMovies] = useState<SearchMovieType[]>([]);
  const [users, setUsers] = useState<SearchUserType[]>([]);
  useEffect(() => {
    if (!query) return;
    if (category == "movie") {
      getSearch(query, "movie")
        .then(defaultResponseHandler)
        .then((data) => {
          setMovies(
            data.map((movie: SearchMovieType) => {
              return {
                ...movie,
                poster: movie.poster.replace("http", "https"),
              };
            }),
          );
        });
    } else if (category == "users") {
      getSearch(query, "users")
        .then(defaultResponseHandler)
        .then((data) => {
          setUsers(data);
        });
    }
  }, [query, category]);

  if (query) {
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
        {category == "movie" ? (
          <SearchMovieList contents={movies} />
        ) : (
          <SearchUserList contents={users} />
        )}
      </section>
    );
  } else {
    return (
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarWrapper}>
          <SearchBar
            transparent={false}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
      </div>
    );
  }
}
