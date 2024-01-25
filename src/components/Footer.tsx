import styles from "./Footer.module.scss";
import reactLogo from "../assets/reactLogo.svg";
import djangoLogo from "../assets/djangoLogo.svg";
import { useEffect, useState } from "react";
import { getFullRatingCountRequest } from "../apis/others";

export default function Footer() {
  const [comments, setComments] = useState<number | null>(null);

  useEffect(() => {
    const getFullRatingCount = async () => {
      getFullRatingCountRequest()
        .then((res) => {
          if (!res.ok) throw Error("error");
          return res.json();
        })
        .then((data) => {
          setComments(data.ratings_count);
        });
    };
    setInterval(getFullRatingCount, 10000);
  }, []);

  return (
    <footer>
      <section className={styles.commentNumber}>
        <span>
          지금까지 <em>★{comments?.toLocaleString("ko-KR")} 개의</em> 평가가
          쌓였어요.
        </span>
      </section>
      <section className={styles.companyInfo}>
        <div className={styles.companyInfoDiv}>
          <div className={styles.footerLeft}>
            <div className={styles.clubIntro}>
              <a href="https://wafflestudio.com/">동아리 소개</a>
            </div>
            <ul className={styles.teamInfo}>
              팀 와플피디아 ㅣ 오수현, 박민철, 정우진, 강우진, 백창인, 이규원,
              이다은 ㅣ 서울특별시 관악구 관악로 1
            </ul>
          </div>
          <div className={styles.footerRight}>
            <a href="https://github.com/wafflestudio21-5/team6-web">
              <img src={reactLogo} />
            </a>
            <div className={styles.blank} />
            <a href="https://github.com/wafflestudio21-5/team6-server">
              <img src={djangoLogo} />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
