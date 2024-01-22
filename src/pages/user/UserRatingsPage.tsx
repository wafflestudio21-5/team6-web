import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserRatingsPage.module.scss";
import { useEffect, useState } from "react";
import DefaultMovieList from "../../components/user/DefaultMovieList";
import RatingsOrderMovieListContainer from "../../components/user/RatingsOrderMovieListContainer";
import { getUserRatings } from "../../apis/user";
import { defaultResponseHandler } from "../../apis/custom";
import { ContentType, ContentsResType } from "../../type";
export default function UserRatingsPage() {
  const navigate = useNavigate();
  const [navMode, setNavMode] = useState<"default" | "ratingsOrder">("default");
  const { id } = useParams();
  const [userRatingMoviesData, setUserRatingMoviesData] =
    useState<ContentType[]>();
  useEffect(() => {
    id &&
      getUserRatings(parseInt(id))
        .then(defaultResponseHandler)
        .then((data) => {
          console.log("moviesData : ", data);

          setUserRatingMoviesData(data);
        })
        .catch(() => {});
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  }, [navMode]);

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
        <div className={styles.titleContainer}>평가한 작품들</div>
        <div className={styles.navContainer}>
          <div
            onClick={() => {
              setNavMode("default");
            }}
            className={`${styles.defaultNav} ${
              navMode === "default" && styles.chosen
            }`}
          >
            전체
          </div>
          <div
            onClick={() => {
              setNavMode("ratingsOrder");
            }}
            className={`${styles.ratingsOrderNav} ${
              navMode === "ratingsOrder" && styles.chosen
            }`}
          >
            별점 순
          </div>
        </div>
      </div>
      <div className={styles.ratingsPage}>
        <section className={styles.movieListSection}>
          {navMode === "default" ? (
            userRatingMoviesData && (
              <DefaultMovieList userRatingMoviesData={userRatingMoviesData} />
            )
          ) : (
            <RatingsOrderMovieListContainer />
          )}
        </section>
      </div>
    </>
  );
}
