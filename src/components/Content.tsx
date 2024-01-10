import { useState } from "react";
import styles from "./Content.module.scss";
import { Carousel } from "./Carousel";
import profileDefault from "../assets/user_default.jpg";
import StarRating from "./StarRating";
import { contentReviewMenu } from "../const";

function ContentHeader() {
  // 임시
  const content = {
    backGroundImg:
      "https://an2-img.amz.wtchn.net/image/v2/Oc4xhq9o4_2YVAmvyR8MFw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1Ua3lNSGd4TURnd2NUZ3dJbDBzSW5BaU9pSXZkakl2YzNSdmNtVXZhVzFoWjJVdk1UWTNNVFF4T0RJM01UUTBNelE1Tmpnek5pSjkuRlNwNURGdzlQenhIN1BaSmhwWEwweElXR1Z2NUlZYUxjX2dBcWh6X2ZGaw",
    title: "오펜하이머",
    titleEn: "Oppenheimer",
    genre: "2023 스릴러",
    runningTime: "3시간 00분",
  };

  const backGroundStyle = {
    backgroundImage: `url(${content.backGroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section className={styles.headerBackground} style={backGroundStyle}>
      <div className={styles.headerCon}>
        <h2>{content.title}</h2>
        <div className={styles.headerText}>{content.titleEn}</div>
        <div className={styles.headerText}>{content.genre}</div>
        <div className={styles.headerText}>{content.runningTime}</div>
      </div>
    </section>
  );
}

function ContentPanel() {
  const content = {
    posterSrc:
      "https://an2-img.amz.wtchn.net/image/v2/TnfLooyFVulaY3fZhLMNIw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9UQTFNRFk1TWpBNU9ERTVNamt5TkRNaWZRLmdfM0lvai1JZGVCbjVFRXhYQ3VFODMwdEN4MnNEa2JKbXV4VEk3QlJPYVE",
    avgRating: 4.0,
    ratingCount: 1000,
    overView: `
    “나는 이제 죽음이요, 세상의 파괴자가 되었다.” 
  
    세상을 구하기 위해 세상을 파괴할 지도 모르는 선택을 해야 하는 천재 과학자의 핵개발 프로젝트.
    `,
  };
  const user = {
    name: "WOOJIN",
    reviewedRating: 2.5,
  };
  // 추후에 hook으로 수정
  const [rating, setRating] = useState(2 * user.reviewedRating);

  return (
    <section className={styles.panelBackground}>
      <div className={styles.panelCon}>
        <div className={styles.imageCon}>
          <img src={content.posterSrc} alt="영화 포스터" />
          <div className={styles.ratingGraph}>평점 그래프</div>
        </div>
        <main className={styles.reviewCon}>
          <nav className={styles.reviewNav}>
            <div className={styles.userRatingCon}>
              <div className={styles.starRatingBox}>
                <StarRating rating={rating} setRating={setRating} />
              </div>
              <div className={styles.userRatingTextBox}>평가하기</div>
            </div>
            <div className={styles.avgRatingCon}>
              <div className={styles.avgRatingDigit}>
                {content.avgRating.toFixed(1)}
              </div>
              평균 평점({content.ratingCount})
            </div>
            <ul className={styles.reviewMenuCon}>
              {contentReviewMenu.map((item) => (
                <li>
                  <div className={styles.reviewMenuIconBox}>{item.iconSvg}</div>
                  {item.text}
                </li>
              ))}
            </ul>
          </nav>
          {/* <div className={styles.borderBottom}>
            <div className={styles.userCommentCon}>
              <div className={styles.userCommentBox}>
                대단한 작품이군요! {user.name} 님의 감동을 글로 남겨보세요
              </div>
            </div>
          </div> */}
          <div className={styles.overviewBox}>{content.overView}</div>
        </main>
      </div>
    </section>
  );
}

function ContentCast() {
  // 임시
  const cast = {
    img: "https://an2-img.amz.wtchn.net/image/v2/MsLKK8t7W1kQuIr3SztdjQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qUXdlREkwTUNKZExDSndJam9pTDNZeEwzQmxiM0JzWlM5dFpXUnBkVzB2WWpKa016TTRZMll4TmpsbE5qSXpPRGsxTVdRdWFuQm5JbjAuVWJRSHJiR0d0Q2V3WjFvdlFPdEk1ZE5wUnppUHNoc2tCcDE0ZDJGQjhGTQ",
    name: "크리스토퍼 놀란",
    role: "출연",
  };
  const castList = [
    { img: profileDefault, name: "크리스토퍼 놀란", role: "감독" },
  ];
  for (let i = 0; i < 23; i++) castList.push(cast);

  return (
    <section className={styles.castCon}>
      <h2>출연/제작</h2>
      <Carousel>
        <ul>
          {castList.map((cast, idx) => (
            <li>
              <a className={styles.castCard}>
                <img src={cast.img} alt="" />
                <div
                  className={`${styles.castDescCon} ${
                    idx % 3 !== 2 ? styles.borderBottom : ""
                  }`}
                >
                  <h3 className={styles.castName}>{cast.name}</h3>
                  <p className={styles.castRole}>{cast.role}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Carousel>
    </section>
  );
}

function ContentComments() {
  return <div>comment</div>;
}

const Content = {
  Header: ContentHeader,
  Panel: ContentPanel,
  Cast: ContentCast,
  Comments: ContentComments,
};

export default Content;
