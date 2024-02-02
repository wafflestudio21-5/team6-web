import { useState } from "react";
import styles from "./RecentlyViewedContents.module.scss";
import { Link } from "react-router-dom";
import useRecentContents from "../hooks/useRecentContents";

export default function RecentlyViewedContents() {
  const [isOpenRecentContents, setIsOpenRecentContents] = useState(false);
  const { recentContents } = useRecentContents();

  return (
    <div className={styles.fixedPositionCon}>
      <div className={styles.relativePostionCon}>
        <div className={styles.absolutePostionCon}>
          {isOpenRecentContents ? (
            <div
              className={styles.cardListCon}
              onMouseLeave={() => setIsOpenRecentContents(false)}
            >
              <div className={styles.cardList}>
                <header>
                  <h2>최근 구경한 영화({recentContents.length}건)</h2>
                </header>
                <ul>
                  {recentContents.map((content) => (
                    <li key={content.movieCD}>
                      <Link to={`/contents/${content.movieCD}`}>
                        <img src={content.poster} alt="" />
                        <div className={styles.contentTitleBox}>
                          {`${content.title_ko} · ${content.directors?.[0].name}`}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div
              className={styles.listOpenIcon}
              onMouseEnter={() => setIsOpenRecentContents(true)}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
