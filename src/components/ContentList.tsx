import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styles from "./ContentList.module.scss";
import { getContentListRequest } from "../apis/content";
import { defaultResponseHandler } from "../apis/custom";
import { useAuthContext } from "../contexts/authContext";

export type MovieType = {
  movieCD: number;
  title_ko: string;
  release_date: string;
  prod_country: string;
  poster: string;
  average_rate: number;
  my_rate: { my_rate: number };
};

export type ContentListProps = {
  title: string;
  order: string;
};

function ContentCell(content: MovieType, rank: number) {
  return (
    <li key={rank}>
      <Link to={`/contents/${content.movieCD}`}>
        <div className={styles.movieImage}>
          {content.poster ? (
            <img className={styles.poster} src={content.poster} />
          ) : (
            <div className={styles.poster} />
          )}
          <div className={styles.rank}>{rank}</div>
        </div>
        <div className={styles.movieInfo}>
          <div className={styles.movieName}>{content.title_ko}</div>
          <div className={styles.movieYearCountry}>
            {content.release_date.substring(0, 4)} · {content.prod_country}
          </div>
          {content.my_rate ? (
            <div className={styles.movieRatingMy}>
              평가함 ★{content.my_rate.my_rate.toFixed(1)}
            </div>
          ) : (
            content.average_rate && (
              <div
                className={
                  content.average_rate
                    ? styles.movieRating
                    : styles.movieRatingNone
                }
              >
                평균 ★{content.average_rate.toFixed(1)}
              </div>
            )
          )}
        </div>
      </Link>
    </li>
  );
}

export default function ContentList({ title, order }: ContentListProps) {
  const [translateX, setTranslateX] = useState(0);
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const carouselUlRef = useRef<HTMLUListElement>(null);

  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const [contents, setContents] = useState<MovieType[]>(
    new Array(9)
      .fill({
        movieCD: 0,
        title_ko: "...",
        release_date: "",
        prod_country: "",
        poster: "",
        average_rate: null,
        my_rate: null,
      })
      .concat([
        {
          movieCD: 0,
          title_ko: "...",
          release_date: "",
          prod_country: "",
          poster: "",
          average_rate: 5,
          my_rate: null,
        },
      ]),
  );

  const { accessToken } = useAuthContext();

  useEffect(() => {
    order === "box-office"
      ? getContentListRequest(order, accessToken ?? undefined)
          .then(defaultResponseHandler)
          .then((data) => {
            setContents(
              data.map(
                (movieRes: {
                  movie: MovieType;
                  my_rate: number | null;
                  rank: number;
                }) => {
                  const movie = movieRes.movie;
                  return {
                    ...movie,
                    poster: movie.poster.replace("http", "https"),
                    my_rate: movieRes.my_rate
                      ? { my_rate: movieRes.my_rate }
                      : null,
                  };
                },
              ),
            );
          })
      : getContentListRequest(order, accessToken ?? undefined)
          .then(defaultResponseHandler)
          .then((data) => {
            setContents(
              data.map((movie: MovieType) => {
                return {
                  ...movie,
                  poster: movie.poster.replace("http", "https"),
                };
              }),
            );
          });
  }, [order, accessToken]);

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
          : false,
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
          : false,
      );
    }
  }

  return (
    <div className={styles.contentListCarousel}>
      <div className={styles.contentList}>
        <p>{title}</p>
        <div className={styles.scrollBar} ref={carouselContentRef}>
          <ul ref={carouselUlRef}>
            {contents.map((content: MovieType, index: number) =>
              ContentCell(content, index + 1),
            )}
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
