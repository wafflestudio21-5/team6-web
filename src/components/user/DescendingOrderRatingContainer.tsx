import { useNavigate } from "react-router-dom";
import styles from "./DescendingOrderRatingContainer.module.scss";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

export default function DescendingOrderRatingContainer() {
  return (
    <section className={styles.DescendingOrderContainer}>
      {Array(10)
        .fill(10)
        .map((_, index) => {
          return <MovieCaroucelByRatingNumber ratingNumber={5 - 0.5 * index} />;
        })}
    </section>
  );
}

function MovieCaroucelByRatingNumber({
  ratingNumber,
}: {
  ratingNumber: number;
}) {
  const [translateX, setTranslateX] = useState(0);
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const carouselUlRef = useRef<HTMLUListElement>(null);

  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  function handleRightClick() {
    const scrollWidth = carouselUlRef.current?.scrollWidth;
    const carouselWidth = carouselContentRef.current?.clientWidth;
    if (scrollWidth && carouselWidth) {
      const nextTranslateX =
        carouselWidth - translateX < scrollWidth - carouselWidth
          ? translateX - carouselWidth
          : carouselWidth - scrollWidth;
      carouselUlRef.current.style.transform = `translateX(${nextTranslateX}px)`;
      setTranslateX(nextTranslateX);
      setIsFirst(nextTranslateX === 0);
      setIsLast(
        scrollWidth && carouselWidth
          ? carouselWidth - nextTranslateX === scrollWidth
          : false,
      );
    }
  }
  function handleLeftClick() {
    const scrollWidth = carouselUlRef.current?.scrollWidth;
    const carouselWidth = carouselContentRef.current?.clientWidth;
    if (scrollWidth && carouselWidth) {
      const nextTranslateX =
        -translateX > carouselWidth ? translateX + carouselWidth : 0;
      carouselUlRef.current.style.transform = `translateX(${nextTranslateX}px)`;
      setTranslateX(nextTranslateX);
      setIsFirst(nextTranslateX === 0);
      setIsLast(
        scrollWidth && carouselWidth
          ? carouselWidth - nextTranslateX === scrollWidth
          : false,
      );
    }
  }

  return (
    <>
      <div className={styles.headerByRatingNumber}>
        <h2 className={styles.titleByRatingNumber}>
          {ratingNumber} 평가함 <span>44</span>
        </h2>
        <div className={styles.moreMoviesButtonBox}>
          <Link to={(ratingNumber * 2).toString()}>더보기</Link>
        </div>
      </div>
      <div className={styles.contentListCarousel}>
        <div className={styles.contentList}>
          <div className={styles.scrollBar} ref={carouselContentRef}>
            <ul ref={carouselUlRef}>
              {Array(30)
                .fill(0)
                .map(() => (
                  <MovieCell />
                ))}
            </ul>
          </div>
          {isFirst || (
            <div className={styles.lButton}>
              <button onClick={handleLeftClick}>
                <img
                  alt="left"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDYgOCkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMjkyQTMyIiBzdHJva2U9IiMyOTJBMzIiIHN0cm9rZS13aWR0aD0iLjM1IiBkPSJNMy40MjkgMTMuNDA5TDQuMzU0IDE0LjI1OCAxMC42OCA4LjQ2IDExLjE0MyA4LjAzNiA0LjM1NCAxLjgxMyAzLjQyOSAyLjY2MiA5LjI5MSA4LjAzNnoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2IDgpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
                />
              </button>
            </div>
          )}
          {isLast || (
            <div className={styles.rButton}>
              <button onClick={handleRightClick}>
                <img
                  alt="right"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyOTJBMzIiIHN0cm9rZT0iIzI5MkEzMiIgc3Ryb2tlLXdpZHRoPSIuMzUiIGQ9Ik0zLjQyOSAxMy40MDlMNC4zNTQgMTQuMjU4IDEwLjY4IDguNDYgMTEuMTQzIDguMDM2IDQuMzU0IDEuODEzIDMuNDI5IDIuNjYyIDkuMjkxIDguMDM2eiIvPgogICAgPC9nPgo8L3N2Zz4K"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function MovieCell() {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate("/contents/1");
      }}
    >
      <img
        src="https://an2-img.amz.wtchn.net/image/v2/WSwwV37ZZJtSYbI_jOi0Hg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk16VTBNVEUwTXprME5ESXlNVFkyT0RJaWZRLmQtaFFQNUgyQk1kb3hmZk5CQ3ZWS2JiZ3ZfMDFXc0ZLdlJXUXZDOElQVFE"
        alt="movieImage"
      />
      <p>노 베어스</p>
    </li>
  );
}
