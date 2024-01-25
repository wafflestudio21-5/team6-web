import { useState } from "react";
import styles from "./StarRating.module.scss";
// import { MyRateType } from "../type";
import {
  createRatingRequest,
  deleteRatingRequest,
  updateRatingRequest,
} from "../apis/content";
import { useAuthContext } from "../contexts/authContext";

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
        onMouseOver={() => onMouseEnterStar(rating + 0.5)}
        onMouseLeave={onMouseLeaveStar}
        onClick={() => onClickStar(rating + 0.5)}
      >
        <svg viewBox="0 0 44 44" width="44" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 33.444L9.83 42.327c-.784.572-1.842-.196-1.539-1.118l4.687-14.32L.769 18.06c-.787-.569-.383-1.812.588-1.81l15.067.033 4.624-14.34c.298-.924 1.606-.924 1.904 0l4.624 14.34 15.067-.033c.971-.002 1.375 1.241.588 1.81l-12.209 8.829 4.688 14.32c.302.922-.756 1.69-1.54 1.118L22 33.444z"></path>
        </svg>
      </div>
      <div
        className={`${styles.star} ${styles.starRight} ${colorRight}`}
        onMouseOver={() => onMouseEnterStar(rating + 1)}
        onMouseLeave={onMouseLeaveStar}
        onClick={() => onClickStar(rating + 1)}
      >
        <svg viewBox="0 0 44 44" width="44" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 33.444L9.83 42.327c-.784.572-1.842-.196-1.539-1.118l4.687-14.32L.769 18.06c-.787-.569-.383-1.812.588-1.81l15.067.033 4.624-14.34c.298-.924 1.606-.924 1.904 0l4.624 14.34 15.067-.033c.971-.002 1.375 1.241.588 1.81l-12.209 8.829 4.688 14.32c.302.922-.756 1.69-1.54 1.118L22 33.444z"></path>
        </svg>
      </div>
    </div>
  );
}

type StarRatingProps = {
  my_rate: {
    id: number;
    my_rate: number;
  } | null;
  movieCD: string;
  refetch: () => void;
};

export default function StarRating({
  my_rate,
  movieCD,
  refetch,
}: StarRatingProps) {
  const savedRating = my_rate ? my_rate.my_rate : 0;
  const [selectedRating, setSelectedRating] = useState(savedRating);
  const { isLogined, accessToken } = useAuthContext();

  const onMouseEnterStar = (rating: number) => {
    setSelectedRating(rating);
  };
  const onMouseLeaveStar = () => {
    setSelectedRating(savedRating);
  };
  const onClickStarHandler = (rating: number) => {
    if (!isLogined) {
      // loginModal;
    } else {
      if (!my_rate)
        return createRatingRequest(movieCD, rating, accessToken ?? "").then(
          () => {
            refetch();
          }
        );
      if (rating === my_rate.my_rate)
        return deleteRatingRequest(my_rate.id, accessToken ?? "").then(() => {
          refetch();
        });
      return updateRatingRequest(my_rate.id, rating, accessToken ?? "").then(
        () => {
          refetch();
        }
      );
    }
  };

  const stars: ("full" | "half" | "empty")[] = [
    selectedRating >= 1 ? "full" : selectedRating === 0.5 ? "half" : "empty",
    selectedRating >= 2 ? "full" : selectedRating === 1.5 ? "half" : "empty",
    selectedRating >= 3 ? "full" : selectedRating === 2.5 ? "half" : "empty",
    selectedRating >= 4 ? "full" : selectedRating === 3.5 ? "half" : "empty",
    selectedRating >= 5 ? "full" : selectedRating === 4.5 ? "half" : "empty",
  ];

  return (
    <div className={styles.ratingCon}>
      {stars.map((star, idx) => (
        <Star
          key={idx}
          fill={star}
          rating={idx}
          onMouseEnterStar={onMouseEnterStar}
          onMouseLeaveStar={onMouseLeaveStar}
          onClickStar={onClickStarHandler}
        />
      ))}
    </div>
  );
}
