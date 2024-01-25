import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserStorageSubPage.module.scss";
import { useEffect, useState } from "react";
import { MovieByStorageSubType } from "../../type";
import { getUserWantToWatch, getUserWatchings } from "../../apis/user";
import { defaultResponseHandler } from "../../apis/custom";
export default function UserStorageSubPage() {
  const { subpage } = useParams();
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieByStorageSubType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  if (subpage !== "wishes" && subpage !== "doings")
    return <div>404 not found</div>;

  const pageTitle = subpage === "wishes" ? "보고 싶어요" : "보는 중이에요";

  useEffect(() => {
    if (!userId) return;
    subpage === "wishes" &&
      getUserWantToWatch(parseInt(userId))
        .then(defaultResponseHandler)
        .then((data) => {
          setMovies(data);
        })
        .catch(() => alert("잘못된 요청입니다"))
        .finally(() => {
          setLoading(false);
        });
    subpage === "doings" &&
      getUserWatchings(parseInt(userId))
        .then(defaultResponseHandler)
        .then((data) => {
          setMovies(data);
        })
        .catch(() => alert("잘못된 요청입니다"))
        .finally(() => {
          setLoading(false);
        });
  }, []);

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
          {pageTitle} <span>{movies?.length}</span>
        </div>

      </div>
      <div className={styles.wishesPage}>
        <section className={styles.movieListSection}>
          <ul className={styles.movieList}>
            {!loading &&
              movies &&
              movies.map((movieContent) => {
                const movie = movieContent.movie;
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
              })}
          </ul>
        </section>
      </div>
    </>
  );
}
