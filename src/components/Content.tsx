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
    comment: "오펜하이머는 얼마나 좋았을까...",
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
              <li>
                <div className={styles.reviewMenuIconBox}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M20.5 13.093h-7.357V20.5h-2.286v-7.407H3.5v-2.286h7.357V3.5h2.286v7.307H20.5v2.286Z"></path>
                  </svg>
                </div>
                보고싶어요
              </li>
              <li>
                <div className={styles.reviewMenuIconBox}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M3 17.253v3.75h3.75l11.06-11.06-3.75-3.75L3 17.253Zm17.71-10.21a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"></path>
                  </svg>
                </div>
                코멘트
              </li>
              <li>
                <div className={styles.reviewMenuIconBox}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M13.626 11.998a1.623 1.623 0 1 1-3.247 0 1.623 1.623 0 0 1 3.247 0Zm-5.6 0a1.623 1.623 0 1 1-3.246 0 1.623 1.623 0 0 1 3.247 0Zm9.576 1.623a1.623 1.623 0 1 0 0-3.246 1.623 1.623 0 0 0 0 3.246Z"></path>
                  </svg>
                </div>
                더보기
              </li>
            </ul>
          </nav>
          <div className={styles.userCommentCon}>
            <div className={styles.userCommentBox}>
              <div className={styles.userCommentText}>
                대단한 작품이군요! {user.name} 님의 감동을 글로 남겨보세요
              </div>
              <button className={styles.commentCreateBtn}>코멘트 남기기</button>
            </div>
          </div>
          <div className={styles.userCommentCon}>
            <h3>내가 쓴 코멘트</h3>
            <div className={styles.userCommentBox}>
              <img className={styles.userImage} src={profileDefault} alt="" />
              <a className={styles.userCommentText}>{user.comment}</a>
              <div className={styles.commentBtnBox}>
                <button>
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0EwQTBBMCIgZD0iTTUuMjUgMTQuMjVoNy41di03LjVoMS41VjE1YS43NS43NSAwIDAgMS0uNzUuNzVoLTlhLjc1Ljc1IDAgMCAxLS43NS0uNzVWNi43NWgxLjV2Ny41ek0xMiA0LjVoMy43NVY2SDIuMjVWNC41SDZWM2EuNzUuNzUgMCAwIDEgLjc1LS43NWg0LjVBLjc1Ljc1IDAgMCAxIDEyIDN2MS41em0tMS41IDB2LS43NWgtM3YuNzVoM3pNNi43NSA2Ljc1aDEuNXY2Ljc1aC0xLjVWNi43NXptMyAwaDEuNXY2Ljc1aC0xLjVWNi43NXoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" />
                  수정
                </button>
                <div className={styles.virtualLineBox}>
                  <div className={styles.virtualLine}></div>
                </div>
                <button>
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0EwQTBBMCIgZD0iTTIuMTggMTUuMzlsLjcwMy0zLjk4IDMuNzEzIDMuNzEyLTMuOTgxLjcwMmEuMzc0LjM3NCAwIDAgMS0uNDM0LS40MzR6bTEuNDk4LTQuNzc2bDYuMzY0LTYuMzY0IDMuNzEzIDMuNzEyLTYuMzY0IDYuMzY0LTMuNzEzLTMuNzEyek0xNS42MDcgNS4wNGEuNzUuNzUgMCAwIDEgMCAxLjA2bC0xLjA2IDEuMDYxLTMuNzEzLTMuNzEyIDEuMDYtMS4wNmEuNzUuNzUgMCAwIDEgMS4wNiAwbDIuNjUzIDIuNjUxeiIvPgogICAgPC9nPgo8L3N2Zz4K" />
                  삭제
                </button>
              </div>
            </div>
          </div>
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
  const content = {
    likeCount: 200,
    subcommentCount: 1000,
  };
  const comment = {
    user: {
      img: profileDefault,
      name: "이동진",
    },
    reviewRating: 4.5,
    text: `줄리어스 로버트 오펜하이머..
줄리어스 로버트 오펜하이머..
자기 이야기가 영화로 만들어진다니.
로버트는 얼마나 좋았을까.
    `,
  };
  const comments = [];

  for (let i = 0; i < 8; i++) {
    comments.push(comment);
  }
  return (
    <section className={styles.commentsCon}>
      <header>
        <h2>
          코멘트 <span className={styles.commentCount}>10000+</span>
        </h2>
        <a className={styles.moreComments}>더보기</a>
      </header>
      <div className={styles.commentGridCon}>
        <ul className={styles.commentsGrid}>
          {comments.map((comment) => (
            <li className={styles.commentBox}>
              <div className={styles.commentHead}>
                <a className={styles.userBox}>
                  <img src={comment.user.img} />
                  {comment.user.name}
                </a>
                <div className={styles.reviewRating}>
                  <svg
                    viewBox="0 0 44 44"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 33.444L9.83 42.327c-.784.572-1.842-.196-1.539-1.118l4.687-14.32L.769 18.06c-.787-.569-.383-1.812.588-1.81l15.067.033 4.624-14.34c.298-.924 1.606-.924 1.904 0l4.624 14.34 15.067-.033c.971-.002 1.375 1.241.588 1.81l-12.209 8.829 4.688 14.32c.302.922-.756 1.69-1.54 1.118L22 33.444z"></path>
                  </svg>
                  {comment.reviewRating}
                </div>
              </div>
              <div className={styles.commentTextBox}>
                <a className={styles.commentText}>{comment.text}</a>
              </div>
              <div className={styles.commentFeedbackCon}>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzc4Nzg3OCI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik02Ljc1IDkuNDg1aC0zYTEgMSAwIDAgMC0xIDF2MTBhMSAxIDAgMCAwIDEgMWgzYTEgMSAwIDAgMCAxLTF2LTEwYTEgMSAwIDAgMC0xLTFNMjAuNjU3IDguNTY2YTIuMzYzIDIuMzYzIDAgMCAwLTEuNzc5LS44MTNIMTYuNjJsLjE2NC0uNjI3Yy4xMzctLjUyOC4yMDEtMS4xMi4yMDEtMS44NjMgMC0xLjkxOS0xLjM3NS0yLjc3OC0yLjczOC0yLjc3OC0uNDQ0IDAtLjc2Ni4xMjMtLjk4Ni4zNzYtLjIuMjI3LS4yODIuNTMtLjI0My45MzVsLjAzIDEuMjMtMi45MDMgMi45NGMtLjU5My42LS44OTQgMS4yMy0uODk0IDEuODcydjkuNjQ3YS41LjUgMCAwIDAgLjUuNWg3LjY4N2EyLjM4OCAyLjM4OCAwIDAgMCAyLjM0OC0yLjA3bDEuNDQ1LTcuNDUyYTIuNDQgMi40NCAwIDAgMC0uNTc0LTEuODk3Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
                  alt=""
                />
                {content.likeCount}
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiM3ODc4NzgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkuODU3IDE3Ljc4Nkw2IDIxdi00LjkxYy0xLjg0MS0xLjM3My0zLTMuMzY5LTMtNS41OUMzIDYuMzU4IDcuMDMgMyAxMiAzczkgMy4zNTggOSA3LjVjMCA0LjE0Mi00LjAzIDcuNS05IDcuNS0uNzM5IDAtMS40NTYtLjA3NC0yLjE0My0uMjE0eiIvPgo8L3N2Zz4K"
                  alt=""
                />
                {content.subcommentCount}
              </div>
              <div className={styles.commentLikeBtnBox}>
                <button>좋아요</button>
              </div>
            </li>
          ))}
        </ul>
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
