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
import useChangeTitle from "../hooks/useChangeTitle";

export default function SearchPage() {
  const { setTitle } = useChangeTitle();
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
  const [page, setPage] = useState(1);

  const [nextAvailable, setNextAvailable] = useState(false);

  const nextPage = () => {
    if (!query) return;
    setPage(page + 1);
    setNextAvailable(false);
    if (category == "movie") {
      getSearch(query, "movie", page + 1)
        .then(defaultResponseHandler)
        .then((data) => {
          if (data.next) setNextAvailable(true);
          setMovies([
            ...movies,
            ...data.results.map((movie: SearchMovieType) => {
              return {
                ...movie,
                poster: movie.poster.replace("http", "https"),
              };
            }),
          ]);
        });
    } else if (category == "users") {
      getSearch(query, "users", page + 1)
        .then(defaultResponseHandler)
        .then((data) => {
          if (data.next) setNextAvailable(true);
          setUsers([...users, ...data.results]);
        });
    }
  };

  useEffect(() => {
    setMovies([]);
    setUsers([]);
    setTitle(
      query
        ? query + "의 검색결과 - 와플피디아"
        : "와플피디아 - 영화 평가 서비스",
    );
    if (!query) return;
    setNextAvailable(false);
    if (category == "movie") {
      getSearch(query, "movie", 1)
        .then(defaultResponseHandler)
        .then((data) => {
          if (data.next) setNextAvailable(true);
          setMovies(
            data.results.map((movie: SearchMovieType) => {
              return {
                ...movie,
                poster: movie.poster.replace("http", "https"),
              };
            }),
          );
        });
    } else if (category == "users") {
      getSearch(query, "users", 1)
        .then(defaultResponseHandler)
        .then((data) => {
          if (data.next) setNextAvailable(true);
          setUsers(data.results);
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
        <div className={styles.showMore}>
          <button
            className={nextAvailable ? "" : styles.invisible}
            onClick={nextAvailable ? nextPage : () => {}}
          >
            더보기{" "}
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNSA5LjEwMDFMMTIgMTQuNjAwMUwxNy41IDkuMTAwMSIgc3Ryb2tlPSIjNzg3OTgyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8L3N2Zz4K" />
          </button>
        </div>
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
