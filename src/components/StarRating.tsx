import { useState } from "react";
import styles from "./StarRating.module.scss";
// import { MyRateType } from "../type";
import {
  createRatingRequest,
  deleteRatingRequest,
  updateRatingRequest,
} from "../apis/content";
import { useAuthContext } from "../contexts/authContext";
import { defaultResponseHandler } from "../apis/custom";

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
  myRate: {
    id: number;
    my_rate: number;
  } | null;
  setMyRate: (
    newRate: {
      id: number;
      my_rate: number;
    } | null,
  ) => void;
  movieCD: string;
};

export default function StarRating({
  myRate,
  setMyRate,
  movieCD,
}: StarRatingProps) {
  const savedRating = myRate ? myRate.my_rate : 0;
  const [selectedRating, setSelectedRating] = useState(savedRating);
  const [hover, setHover] = useState(false);
  const { isLogined, accessToken } = useAuthContext();

  const onMouseEnterStar = (rating: number) => {
    setSelectedRating(rating);
    setHover(true);
  };
  const onMouseLeaveStar = () => {
    setSelectedRating(savedRating);
    setHover(false);
  };
  const onClickStarHandler = (rating: number) => {
    if (!isLogined) {
      // loginModal;
    } else {
      if (myRate) {
        if (rating === savedRating) {
          deleteRatingRequest(myRate.id, accessToken ?? "")
            .then(() => {
              setMyRate(null);
              setSelectedRating(0);
            })
            .catch((e) => console.log(e));
        } else {
          updateRatingRequest(myRate.id, rating, accessToken ?? "")
            .then(defaultResponseHandler)
            .then((data) => {
              setMyRate({ ...data, my_rate: data.rate });
              setSelectedRating(data.rate);
            })
            .catch((e) => console.log(e));
        }
      } else {
        createRatingRequest(movieCD, rating, accessToken ?? "")
          .then(defaultResponseHandler)
          .then((data) => {
            setMyRate({ ...data, my_rate: data.rate });
            setSelectedRating(data.rate);
          })
          .catch((e) => console.log(e));
      }
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
      {hover && savedRating > 0 && savedRating === selectedRating && (
        <div
          style={{ left: `${44 * savedRating - 11}px` }}
          className={styles.cancelContainer}
        >
          <div className={styles.cancel}>
            <span>취소하기</span>
            <img
              className={styles.cancelRect}
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjkiIGhlaWdodD0iMzgiID4KICAgIDxkZWZzPgogICAgICAgIDxwYXRoIGlkPSJiIiBkPSJNMTIuNDEgNmg0NC4xOGMyLjIzIDAgMy4wMzcuMjMyIDMuODUyLjY2OGE0LjU0MyA0LjU0MyAwIDAgMSAxLjg5IDEuODljLjQzNi44MTUuNjY4IDEuNjIzLjY2OCAzLjg1MnYxMy4xOGMwIDIuMjMtLjIzMiAzLjAzNy0uNjY4IDMuODUyYTQuNTQzIDQuNTQzIDAgMCAxLTEuODkgMS44OWMtLjgxNS40MzYtMS42MjMuNjY4LTMuODUyLjY2OEgxMi40MWMtMi4yMyAwLTMuMDM3LS4yMzItMy44NTItLjY2OGE0LjU0MyA0LjU0MyAwIDAgMS0xLjg5LTEuODlDNi4yMzIgMjguNjI3IDYgMjcuODIgNiAyNS41OVYxMi40MWMwLTIuMjMuMjMyLTMuMDM3LjY2OC0zLjg1MmE0LjU0MyA0LjU0MyAwIDAgMSAxLjg5LTEuODlDOS4zNzMgNi4yMzIgMTAuMTggNiAxMi40MSA2eiIvPgogICAgICAgIDxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIxMzUuMSUiIGhlaWdodD0iMTc2LjklIiB4PSItMTcuNSUiIHk9Ii0zNC42JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIxIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIHN0ZERldmlhdGlvbj0iMi41Ii8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KICAgICAgICAgICAgPGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjIiLz4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPSJzaGFkb3dPZmZzZXRPdXRlcjIiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMiIgc3RkRGV2aWF0aW9uPSIxIi8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIyIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMiIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA1IDAiLz4KICAgICAgICAgICAgPGZlTWVyZ2U+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJzaGFkb3dNYXRyaXhPdXRlcjIiLz4KICAgICAgICAgICAgPC9mZU1lcmdlPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
            />
            <div>
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjMiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyMyAxMiI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTAgMGgyM3YxMkgweiIvPgogICAgICAgIDxwYXRoIGlkPSJkIiBkPSJNMTIuNjggNi4zNDhsMy40NzctNC40MkE1LjA1NiA1LjA1NiAwIDAgMSAyMCAwSDNhNS4wODMgNS4wODMgMCAwIDEgMy44NyAxLjk0NWwzLjQ1MSA0LjQwMWExLjUgMS41IDAgMCAwIDIuMzYuMDAyeiIvPgogICAgICAgIDxmaWx0ZXIgaWQ9ImMiIHdpZHRoPSIyMTcuNiUiIGhlaWdodD0iMzg1LjclIiB4PSItNTguOCUiIHk9Ii0xMTQuMyUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjIuNSIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMiIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMiIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIyIiBzdGREZXZpYXRpb249IjEiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggaW49InNoYWRvd0JsdXJPdXRlcjIiIHJlc3VsdD0ic2hhZG93TWF0cml4T3V0ZXIyIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDUgMCIvPgogICAgICAgICAgICA8ZmVNZXJnZT4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0ic2hhZG93TWF0cml4T3V0ZXIxIi8+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMiIvPgogICAgICAgICAgICA8L2ZlTWVyZ2U+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxtYXNrIGlkPSJiIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8ZyBtYXNrPSJ1cmwoI2IpIj4KICAgICAgICAgICAgPHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYykiIHhsaW5rOmhyZWY9IiNkIi8+CiAgICAgICAgICAgIDx1c2UgZmlsbD0iI0ZGRiIgeGxpbms6aHJlZj0iI2QiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
