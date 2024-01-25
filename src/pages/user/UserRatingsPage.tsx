import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserRatingsPage.module.scss";
import { useEffect, useState } from "react";
import MovieListByRatingValueContainer from "../../components/user/MovieListByRatingValueContainer";
import { getUserRatingMovies } from "../../apis/user";
import { defaultResponseHandler } from "../../apis/custom";
import { MovieResByUserType } from "../../type";
export default function UserRatingsPage() {
  const navigate = useNavigate();
  const [navMode, setNavMode] = useState<"default" | "ratingsOrder">("default");
  const { id: userId } = useParams();
  const [movies, setMovies] = useState<MovieResByUserType[] | null>(null);
  const [movieCount, setmovieCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextmoviesUrl, setNextMoviesUrl] = useState<string | null>(null);

  const displayStyleHandler = (sectionKey: "default" | "ratingsOrder") => {
    if (navMode !== sectionKey) return { display: "none" };
  };

  useEffect(() => {
    userId &&
      getUserRatingMovies(parseInt(userId), {})
        .then(defaultResponseHandler)
        .then((data) => {
          setMovies(data.results);
          setmovieCount(data.count);
          setNextMoviesUrl(data.next);
        })
        .catch(() => alert("잘못된 요청입니다"))
        .finally(() => {
          setLoading(false);
        });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;

      if (window.innerHeight + scrollTop + 150 >= scrollHeight) {
        nextmoviesUrl &&
          movies &&
          fetch(nextmoviesUrl)
            .then(defaultResponseHandler)
            .then((data) => {
              console.log("scroll success  :", data);
              const commentsResponse = data;
              setMovies(movies.concat(commentsResponse.results));
              setNextMoviesUrl(commentsResponse.next);
            })
            .catch(() => alert("잘못된 요청입니다"));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [movies]);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  }, []);

  return (
    <>
      <div className={styles.fixedTab}>
        <div className={styles.backButtonContainer}>
          <button
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className={styles.titleContainer}>
          평가한 작품들 <span>{movieCount}</span>
        </div>
        <div className={styles.navContainer}>
          <div
            onClick={() => {
              setNavMode("default");
            }}
            className={`${styles.defaultNav} ${
              navMode === "default" && styles.chosen
            }`}
          >
            전체
          </div>
          <div
            onClick={() => {
              setNavMode("ratingsOrder");
            }}
            className={`${styles.ratingsOrderNav} ${
              navMode === "ratingsOrder" && styles.chosen
            }`}
          >
            별점 순
          </div>
        </div>
      </div>
      <div className={styles.ratingsPage}>
        <section className={styles.movieListSection}>
          {!loading && movies && (
            <DefaultMovieList
              movies={movies}
              displayStyleHandler={displayStyleHandler}
            />
          )}

          <MovieListByRatingValueContainer
            displayStyleHandler={displayStyleHandler}
          />
        </section>
      </div>
    </>
  );
}

function DefaultMovieList({
  movies,
  displayStyleHandler,
}: {
  movies: MovieResByUserType[];
  displayStyleHandler: (sectionKey: "default" | "ratingsOrder") =>
    | {
        display: string;
      }
    | undefined;
}) {
  const navigate = useNavigate();

  return (
    <ul
      className={styles.defaultMovieList}
      style={displayStyleHandler("default")}
    >
      {movies.map((movieData: MovieResByUserType) => {
        const movie = movieData.movie;
        return (
          <li
            className={styles.movieCard}
            key={movieData.movie.movieCD}
            onClick={() => {
              navigate(`/contents/${movie.movieCD}`);
            }}
          >
            <img src={movie.poster} alt={movie.title_ko} />
            <p>{movie.title_ko}</p>

            <span>평가함 ★ {movieData.rate}</span>

          </li>
        );
      })}
    </ul>
  );
}
