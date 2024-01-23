import { useNavigate } from "react-router-dom";
import styles from "./DefaultMovieList.module.scss";
import { ContentResTypeInRatingsPage } from "../../type";

export default function DefaultMovieList({
  userRatingMoviesData,
}: {
  userRatingMoviesData: ContentResTypeInRatingsPage[];
}) {
  const navigate = useNavigate();
  return (
    <ul className={styles.defaultMovieList}>
      {userRatingMoviesData.map((contentRes: ContentResTypeInRatingsPage) => {
        const movie = contentRes.movie;

        return (
          <li
            onClick={() => {
              navigate(`/contents/${movie.movieCD}`);
            }}
          >
            <img src={movie.poster} alt={movie.titleKo} />
            <p>{movie.titleKo}</p>
            {/*    <span>{movieContent.my_rate}</span>*/}
          </li>
        );
      })}
    </ul>
  );
}
