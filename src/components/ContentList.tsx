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
        <div className={styles.imageDiv}>
          <img src={content.posterUrl} />
          <div className={styles.rank}>{rank}</div>
        </div>
      </Link>
    </li>
  );
}

export default function ContentList({ title, contents }: ContentListProps) {
  return (
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
  );
}
