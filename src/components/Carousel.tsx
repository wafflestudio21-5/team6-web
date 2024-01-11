import { ReactNode, useRef, useState } from "react";
import styles from "./Carousel.module.scss";

export function Carousel({ children }: { children: ReactNode }) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const carouselContentRef = useRef<HTMLDivElement>(null);

  const scrollWidth = carouselContentRef.current?.scrollWidth;
  const carouselWidth = carouselContentRef.current?.clientWidth;

  const isLastCarousel =
    scrollWidth && carouselWidth
      ? carouselWidth - translateX === scrollWidth
      : false;
  const isFirstCarousel = translateX === 0;

  function handleRightClick() {
    if (scrollWidth && carouselWidth) {
      const nextTranslateX =
        carouselWidth - translateX < scrollWidth - carouselWidth
          ? translateX - carouselWidth
          : carouselWidth - scrollWidth;
      carouselContentRef.current.style.transform = `translateX(${nextTranslateX}px)`;
      setTranslateX(nextTranslateX);
    }
  }
  function handleLeftClick() {
    if (scrollWidth && carouselWidth) {
      const nextTranslateX =
        -translateX > carouselWidth ? translateX + carouselWidth : 0;
      carouselContentRef.current.style.transform = `translateX(${nextTranslateX}px)`;
      setTranslateX(nextTranslateX);
    }
  }

  return (
    <div
      className={styles.carouselCon}
      onMouseEnter={() => {
        setIsButtonVisible(true);
      }}
      onMouseLeave={() => {
        setIsButtonVisible(false);
      }}
    >
      <div className={styles.carouselContent} ref={carouselContentRef}>
        {children}
      </div>
      {isButtonVisible && !isLastCarousel && (
        <div className={styles.carouselBtnConRight}>
          <button className={styles.carouselBtn} onClick={handleRightClick}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyOTJBMzIiIHN0cm9rZT0iIzI5MkEzMiIgc3Ryb2tlLXdpZHRoPSIuMzUiIGQ9Ik0zLjQyOSAxMy40MDlMNC4zNTQgMTQuMjU4IDEwLjY4IDguNDYgMTEuMTQzIDguMDM2IDQuMzU0IDEuODEzIDMuNDI5IDIuNjYyIDkuMjkxIDguMDM2eiIvPgogICAgPC9nPgo8L3N2Zz4K"
              alt=">"
            />
          </button>
        </div>
      )}
      {isButtonVisible && !isFirstCarousel && (
        <div className={styles.carouselBtnConLeft}>
          <button className={styles.carouselBtn} onClick={handleLeftClick}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMEgxMlYxNkgweiIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDYgOCkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMjkyQTMyIiBzdHJva2U9IiMyOTJBMzIiIHN0cm9rZS13aWR0aD0iLjM1IiBkPSJNMy40MjkgMTMuNDA5TDQuMzU0IDE0LjI1OCAxMC42OCA4LjQ2IDExLjE0MyA4LjAzNiA0LjM1NCAxLjgxMyAzLjQyOSAyLjY2MiA5LjI5MSA4LjAzNnoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2IDgpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
              alt="<"
            />
          </button>
        </div>
      )}
    </div>
  );
}
