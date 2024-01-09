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
        </div>
      </div>
    </div>
  );
}
