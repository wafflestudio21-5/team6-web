import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./UserStoragePage.module.scss";
import { MovieCarousel } from "../../components/user/MovieListByRatingValueContainer";
import { useEffect } from "react";
import { defaultResponseHandler } from "../../apis/custom";
import { useState } from "react";
import { getUserRatingMovies } from "../../apis/user";
import { MovieResByUserType } from "../../type";

export default function UserStoragePage() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [movies, setMovies] = useState<MovieResByUserType[] | null>(null);
  const [movieCount, setmovieCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    userId &&
      getUserRatingMovies(parseInt(userId), {})
        .then(defaultResponseHandler)
        .then((data) => {
          setMovies(data.results.slice(0, 50));
          setmovieCount(data.count);
        })
        .catch(() => alert("잘못된 요청입니다"))
        .finally(() => {
          setLoading(false);
        });
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
        <div className={styles.titleContainer}>보관함</div>
      </div>

      <section className={styles.storageSection}>
        <div className={styles.movieRatingsTab}>
          <span>평가한 영화</span>
          <span className={styles.ratingCount}>{movieCount}</span>
          <div className={styles.moreMoviesButtonBox}>
            <Link to={`/users/${userId}/ratings`}>더보기</Link>
          </div>
        </div>
        {!loading && movies && <MovieCarousel movies={movies} />}
        <Link to="wishes" className={styles.outLinkTab}>
          <span>보고 싶어요</span>
          <span className={styles.count}></span>
        </Link>
        <Link to="doings" className={styles.outLinkTab}>
          <span>보는 중</span>
          <span className={styles.count}></span>
        </Link>
      </section>
    </>
  );
}
