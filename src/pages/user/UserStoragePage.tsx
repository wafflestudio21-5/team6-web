import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./UserStoragePage.module.scss";
import { MovieCarousel } from "../../components/user/RatingsOrderMovieListContainer";
export default function UserStoragePage() {
  const { id } = useParams();
  const navigate = useNavigate();
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
          <span className={styles.ratingCount}>44</span>
          <div className={styles.moreMoviesButtonBox}>
            <Link to={`/users/${id}/ratings`}>더보기</Link>
          </div>
        </div>
        <MovieCarousel />
        <Link to="wishes" className={styles.outLinkTab}>
          <span>보고 싶어요</span>
          <span className={styles.count}>4</span>
        </Link>
        <Link to="doings" className={styles.outLinkTab}>
          <span>보는 중</span>
          <span className={styles.count}>4</span>
        </Link>
      </section>
    </>
  );
}
