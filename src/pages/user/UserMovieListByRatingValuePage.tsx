import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserMovieListByRatingValuePage.module.scss";
import { useState, useEffect } from "react";
import { defaultResponseHandler } from "../../apis/custom";
import { getUserRatingMovies } from "../../apis/user";
import { MovieByUserType } from "../../type";
export default function UserMovieListByRatingValuePage() {
  const { ratingNumber, id: userId } = useParams();
  const number = !!ratingNumber ? parseInt(ratingNumber) : undefined;
  const navigate = useNavigate();

  const [movies, setMovies] = useState<MovieByUserType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextmoviesUrl, setNextMoviesUrl] = useState<string | null>(null);
  const [movieCount, setmovieCount] = useState<number | null>(null);
  useEffect(() => {
    userId &&
      number &&
      getUserRatingMovies(parseInt(userId), { rate: number / 2 })
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
          {number && number / 2}점 준 영화 <span>{movieCount}</span>
        </div>
      </div>
      <div className={styles.ratingsPage}>
        <section className={styles.movieListSection}>
          <ul className={styles.movieList}>
            {movies &&
              movies.map((movieContent) => {
                const movie = movieContent.movie;
                return (
                  <li
                    onClick={() => {
                      navigate(`/contents/${movie.movieCD}`);
                    }}
                  >
                    <img src={movie.poster} alt={movie.titleKo} />
                    <p>{movie.titleKo}</p>
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
    </>
  );
}
