import { Link } from "react-router-dom";
import styles from "./SearchMovieList.module.scss";

type PersonType = {
  peopleCD: string;
  name: string;
};

export type SearchMovieType = {
  movieCD: number;
  title_ko: string;
  prod_country: string;
  poster: string;
  release_date: string;
  directors: PersonType[];
};

export default function SearchMovieList({
  contents,
}: {
  contents: SearchMovieType[];
}) {
  return (
    <div className={styles.searchListContainer}>
      <ul className={styles.searchList}>
        {contents.map((movie: SearchMovieType) => (
          <li key={movie.movieCD}>
            <Link to={`/contents/${movie.movieCD}`}>
              <div className={styles.posterDiv}>
                <img alt={movie.title_ko + "의 포스터"} src={movie.poster} />
              </div>
              <div className={styles.movieInfo}>
                <div className={styles.title}>{movie.title_ko}</div>
                <div className={styles.yearCountry}>
                  {movie.release_date.substring(0, 4)} · {movie.prod_country}
                </div>
                <div className={styles.director}>
                  {movie.directors.map(
                    (director: PersonType, index: number) => (
                      <div key={index}>{director.name}</div>
                    ),
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
