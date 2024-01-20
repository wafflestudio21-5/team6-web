import { useNavigate } from "react-router-dom";
import styles from "./LatestOrderRatingList.module.scss";

export default function LatestOrderRatingList() {
  const navigate = useNavigate();
  return (
    <ul className={styles.RatedMovieList}>
      {Array(100)
        .fill(0)
        .map(() => {
          return (
            <li
              onClick={() => {
                navigate("/contents/1");
              }}
            >
              <img
                src="https://an2-img.amz.wtchn.net/image/v2/WSwwV37ZZJtSYbI_jOi0Hg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk16VTBNVEUwTXprME5ESXlNVFkyT0RJaWZRLmQtaFFQNUgyQk1kb3hmZk5CQ3ZWS2JiZ3ZfMDFXc0ZLdlJXUXZDOElQVFE"
                alt=""
              />
              <p>노 베어스 노 캣 노 도그 노 지라프 노노노</p>
              <span>평가함 5.0</span>
            </li>
          );
        })}
    </ul>
  );
}
