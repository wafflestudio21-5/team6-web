import { useState } from "react";
import styles from "./StarRating.module.scss";

type StarProps = {
  fill: "full" | "half" | "empty";
  rating: number;
  onMouseEnterStar: (selectedRating: number) => void;
  onMouseLeaveStar: () => void;
  onClickStar: (selectedRating: number) => void;
};

function Star(props: StarProps) {
  const { fill, rating, onMouseEnterStar, onMouseLeaveStar, onClickStar } =
    props;
  const colorLeft = fill === "empty" ? styles.unselected : styles.selected;
  const colorRight = fill === "full" ? styles.selected : styles.unselected;

  return (
    <div className={styles.starBox}>
      <div
        className={`${styles.star} ${styles.starLeft} ${colorLeft}`}
        onMouseOver={() => onMouseEnterStar(rating + 1)}
        onMouseLeave={onMouseLeaveStar}
        onClick={() => onClickStar(rating + 1)}
      >
        <svg viewBox="0 0 44 44" width="44" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 33.444L9.83 42.327c-.784.572-1.842-.196-1.539-1.118l4.687-14.32L.769 18.06c-.787-.569-.383-1.812.588-1.81l15.067.033 4.624-14.34c.298-.924 1.606-.924 1.904 0l4.624 14.34 15.067-.033c.971-.002 1.375 1.241.588 1.81l-12.209 8.829 4.688 14.32c.302.922-.756 1.69-1.54 1.118L22 33.444z"></path>
        </svg>
      </div>
      <div
        className={`${styles.star} ${styles.starRight} ${colorRight}`}
        onMouseOver={() => onMouseEnterStar(rating + 2)}
        onMouseLeave={onMouseLeaveStar}
        onClick={() => onClickStar(rating + 2)}
      >
        <svg viewBox="0 0 44 44" width="44" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 33.444L9.83 42.327c-.784.572-1.842-.196-1.539-1.118l4.687-14.32L.769 18.06c-.787-.569-.383-1.812.588-1.81l15.067.033 4.624-14.34c.298-.924 1.606-.924 1.904 0l4.624 14.34 15.067-.033c.971-.002 1.375 1.241.588 1.81l-12.209 8.829 4.688 14.32c.302.922-.756 1.69-1.54 1.118L22 33.444z"></path>
        </svg>
      </div>
    </div>
  );
}

type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
};

export default function StarRating({
  rating: reviewedRating,
  setRating,
}: StarRatingProps) {
  const [selectedStars, setSelectedStars] = useState(reviewedRating);

  const onMouseEnterStar = (seletedRating: number) => {
    setSelectedStars(seletedRating);
  };
  const onMouseLeaveStar = () => {
    setSelectedStars(reviewedRating);
  };
  const onClickStar = (seletedRating: number) => {
    //
    console.log(`${seletedRating / 2}점 평가하기`);
    setRating(seletedRating);
  };

  const stars: ("full" | "half" | "empty")[] = [
    selectedStars >= 2 ? "full" : selectedStars === 1 ? "half" : "empty",
    selectedStars >= 4 ? "full" : selectedStars === 3 ? "half" : "empty",
    selectedStars >= 6 ? "full" : selectedStars === 5 ? "half" : "empty",
    selectedStars >= 8 ? "full" : selectedStars === 7 ? "half" : "empty",
    selectedStars >= 10 ? "full" : selectedStars === 9 ? "half" : "empty",
  ];

  return (
    <div className={styles.ratingCon}>
      {stars.map((star, idx) => (
        <Star
          fill={star}
          rating={idx * 2}
          onMouseEnterStar={onMouseEnterStar}
          onMouseLeaveStar={onMouseLeaveStar}
          onClickStar={onClickStar}
        />
      ))}
    </div>
  );
}
