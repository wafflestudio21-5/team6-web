import { useNavigate, useParams } from "react-router-dom";
import styles from "./MovieListByRatingValueContainer.module.scss";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { getUserRatingMovies } from "../../apis/user";
import { defaultResponseHandler } from "../../apis/custom";
import { MovieByUserType, MovieResByUserType, MoviesResType } from "../../type";

export default function MovieListByRatingValueContainer({
  displayStyleHandler,
}: {
  displayStyleHandler: (sectionKey: "default" | "ratingsOrder") =>
    | {
        display: string;
      }
    | undefined;
}) {
  return (
    <section
      className={styles.ratingsOrderMovieListContainer}
      style={displayStyleHandler("ratingsOrder")}
    >
      {Array(10)
        .fill(10)
        .map((_, index) => {
          return <MovieCaroucelBox ratingNumber={5 - 0.5 * index} />;
        })}
    </section>
  );
}

function MovieCaroucelBox({ ratingNumber }: { ratingNumber: number }) {
  const { id: userId } = useParams();
  const [moviesWithRatingNumber, setMoviesWithRatingNumber] = useState<
    MovieResByUserType[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [movieCount, setmovieCount] = useState<number | null>(null);

  useEffect(() => {
    userId &&
      getUserRatingMovies(parseInt(userId), { rate: ratingNumber })
        .then(defaultResponseHandler)
        .then((data: MoviesResType) => {
          setMoviesWithRatingNumber(data.results);
          setmovieCount(data.count);
        })
        .catch(() => {
          console.log("에러");
        })
        .finally(() => {
          setLoading(false);
        });
  }, []);

  return (
    <>
      <div className={styles.headerByRatingNumber}>
        <h2 className={styles.titleByRatingNumber}>
          {ratingNumber.toFixed(1)} 평가함 <span>{movieCount}</span>
        </h2>
        <div className={styles.moreMoviesButtonBox}>
          <Link to={(ratingNumber * 2).toString()}>더보기</Link>
        </div>
      </div>
      {!loading &&
        moviesWithRatingNumber &&
        !!moviesWithRatingNumber.length && (
          <MovieCarousel movies={moviesWithRatingNumber} />
        )}
      {!loading && moviesWithRatingNumber && !moviesWithRatingNumber.length && (
        <div className={styles.notFoundBox}>
          <div className={styles.notFound}></div>
          <span>결과가 없어요</span>
        </div>
      )}
    </>
  );
}

export function MovieCarousel({ movies }: { movies: MovieResByUserType[] }) {
  const [translateX, setTranslateX] = useState(0);
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const carouselUlRef = useRef<HTMLUListElement>(null);

  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  function handleRightClick() {
    const scrollWidth = carouselUlRef.current?.scrollWidth;
    const carouselWidth = carouselContentRef.current?.clientWidth;
    if (scrollWidth && carouselWidth) {
      const nextTranslateX =
        carouselWidth - translateX < scrollWidth - carouselWidth
          ? translateX - carouselWidth
          : carouselWidth - scrollWidth;
      carouselUlRef.current.style.transform = `translateX(${nextTranslateX}px)`;
      setTranslateX(nextTranslateX);
      setIsFirst(nextTranslateX === 0);
      setIsLast(
        scrollWidth && carouselWidth
          ? carouselWidth - nextTranslateX === scrollWidth
          : false
      );
    }
  }
  function handleLeftClick() {
    const scrollWidth = carouselUlRef.current?.scrollWidth;
    const carouselWidth = carouselContentRef.current?.clientWidth;
    if (scrollWidth && carouselWidth) {
      const nextTranslateX =
        -translateX > carouselWidth ? translateX + carouselWidth : 0;
      carouselUlRef.current.style.transform = `translateX(${nextTranslateX}px)`;
      setTranslateX(nextTranslateX);
      setIsFirst(nextTranslateX === 0);
      setIsLast(
        scrollWidth && carouselWidth
          ? carouselWidth - nextTranslateX === scrollWidth
          : false
      );
    }
  }

  return (
    <div className={styles.contentListCarousel}>
      <div className={styles.contentList}>
        <div className={styles.scrollBar} ref={carouselContentRef}>
          <ul ref={carouselUlRef}>
            {movies.map((movieContent) => {
              const movie = movieContent.movie;
              return <MovieCell key={movieContent.id} movie={movie} />;
            })}
          </ul>
        </div>
        {isFirst || (
          <div className={styles.lButton}>
            <button onClick={handleLeftClick}>
              <img
                alt="left"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDYgOCkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMjkyQTMyIiBzdHJva2U9IiMyOTJBMzIiIHN0cm9rZS13aWR0aD0iLjM1IiBkPSJNMy40MjkgMTMuNDA5TDQuMzU0IDE0LjI1OCAxMC42OCA4LjQ2IDExLjE0MyA4LjAzNiA0LjM1NCAxLjgxMyAzLjQyOSAyLjY2MiA5LjI5MSA4LjAzNnoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2IDgpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
              />
            </button>
          </div>
        )}
        {isLast || (
          <div className={styles.rButton}>
            <button onClick={handleRightClick}>
              <img
                alt="right"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyOTJBMzIiIHN0cm9rZT0iIzI5MkEzMiIgc3Ryb2tlLXdpZHRoPSIuMzUiIGQ9Ik0zLjQyOSAxMy40MDlMNC4zNTQgMTQuMjU4IDEwLjY4IDguNDYgMTEuMTQzIDguMDM2IDQuMzU0IDEuODEzIDMuNDI5IDIuNjYyIDkuMjkxIDguMDM2eiIvPgogICAgPC9nPgo8L3N2Zz4K"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MovieCell({ movie }: { movie: MovieByUserType }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/contents/${movie.movieCD}`);
      }}
    >
      <img src={movie.poster} alt={movie.title_ko} />
      <p>{movie.title_ko}</p>
    </li>
  );
}
