import { Link } from "react-router-dom";
import styles from "./ContentList.module.scss";

export type MovieType = {
  name: string;
  releaseYear: string;
  country: string;
  posterUrl: string;
  rating: number;
};

export type ContentListProps = {
  title: string;
  contents: MovieType[];
};

function ContentCell(content: MovieType, rank: number) {
  return (
    <li>
      <Link to="/contents/idididid">
        <div className={styles.movieImage}>
          <img src={content.posterUrl} />
          <div className={styles.rank}>{rank}</div>
        </div>
        <div className={styles.movieInfo}>
          <div className={styles.movieName}>{content.name}</div>
          <div className={styles.movieYearCountry}>
            {content.releaseYear} · {content.country}
          </div>
          <div className={styles.movieRating}>
            평균 ★{content.rating.toFixed(1)}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function ContentList({ title, contents }: ContentListProps) {
  return (
    <div className={styles.contentListCarousel}>
      <div className={styles.contentList}>
        <p>{title}</p>
        <div>
          <ul>
            {contents.map((content: MovieType, index: number) =>
              ContentCell(content, index + 1),
            )}
          </ul>
          <div className={styles.lButton}>
            <button>
              <img
                alt="left"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDYgOCkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMjkyQTMyIiBzdHJva2U9IiMyOTJBMzIiIHN0cm9rZS13aWR0aD0iLjM1IiBkPSJNMy40MjkgMTMuNDA5TDQuMzU0IDE0LjI1OCAxMC42OCA4LjQ2IDExLjE0MyA4LjAzNiA0LjM1NCAxLjgxMyAzLjQyOSAyLjY2MiA5LjI5MSA4LjAzNnoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2IDgpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
              />
            </button>
          </div>
          <div className={styles.rButton}>
            <button>
              <img
                alt="right"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyOTJBMzIiIHN0cm9rZT0iIzI5MkEzMiIgc3Ryb2tlLXdpZHRoPSIuMzUiIGQ9Ik0zLjQyOSAxMy40MDlMNC4zNTQgMTQuMjU4IDEwLjY4IDguNDYgMTEuMTQzIDguMDM2IDQuMzU0IDEuODEzIDMuNDI5IDIuNjYyIDkuMjkxIDguMDM2eiIvPgogICAgPC9nPgo8L3N2Zz4K"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
