import { useState } from "react";
import styles from "./Content.module.scss";
import { Carousel } from "./Carousel";
import profileDefault from "../assets/user_default.jpg";
import StarRating from "./StarRating";

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
const Content = {
  Header: ContentHeader,
  Panel: ContentPanel,
  Cast: ContentCast,
  Comments: ContentComments,
};

export default Content;
