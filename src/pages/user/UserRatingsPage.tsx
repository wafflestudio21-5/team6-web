import { useNavigate } from "react-router-dom";
import styles from "./UserRatingsPage.module.scss";
import { useEffect, useState } from "react";
import LatestOrderRatingList from "../../components/user/LatestOrderRatingList";
import DescendingOrderRatingContainer from "../../components/user/DescendingOrderRatingContainer";
export default function UserRatingsPage() {
  const navigate = useNavigate();
  const [navMode, setNavMode] = useState<"latest" | "descending">("latest");
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
              setNavMode("latest");
            }}
            className={`${styles.latestOrderNav} ${
              navMode === "latest" && styles.chosen
            }`}
          >
            전체
          </div>
          <div
            onClick={() => {
              setNavMode("descending");
            }}
            className={`${styles.latestOrderNav} ${
              navMode === "descending" && styles.chosen
            }`}
          >
            별점 순
          </div>
        </div>
      </div>
      <div className={styles.ratingsPage}>
        <section className={styles.movieListSection}>
          {navMode === "latest" ? (
            <LatestOrderRatingList />
          ) : (
            <DescendingOrderRatingContainer />
          )}
        </section>
      </div>
    </>
  );
}
