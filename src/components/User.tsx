import styles from "./User.module.scss";
import { Link } from "react-router-dom";

export default function User() {
  const {
    nickname,
    identifier,
    connect,
    storage,
    commentLikeCount,
    evaluationCount,
  } = {
    nickname: "오수현 / 학생 / 컴퓨터공학부",
    identifier: "sh020119",
    connect: { followingCount: 100, followerCount: 20 },
    storage: {},
    commentLikeCount: 3,
    evaluationCount: 4,
  };

  return (
    <div className={styles.userContainer}>
      {/* profile section. user 기본 정보와 평가&코멘트 탭을 포함 */}
      <section className={styles.profileSection}>
        <div className={styles.setBttnBox}>
          <button className={styles.setBttn} />
        </div>
        <div className={styles.profileInfoBox}>
          <div className={styles.profilePhoto}></div>
          <h1>{nickname}</h1>
          <p>{identifier}</p>
          <div className={styles.connection}>
            <Link to={`followings`}>
              팔로워 <span>{connect.followerCount}</span>
            </Link>
            <div className={styles.verticalLine} />
            <Link to={"followers"}>
              팔로워 <span>{connect.followingCount}</span>
            </Link>
          </div>
        </div>
        <div className={styles.userTabBox}>
          <div className={styles.evaluation}>
            <span className={styles.count}>{evaluationCount}</span>
            <span className={styles.underLetter}>평가</span>
          </div>
          <div className={styles.verticalLine} />
          <div className={styles.comment}>
            <span className={styles.count}>{evaluationCount}</span>
            <span className={styles.underLetter}>코멘트</span>
          </div>
        </div>
      </section>
      {/* storageSection 영화 보관함 */}
      <section className={styles.storageSection}>
        <h1>보관함</h1>
        <div className={styles.movieStorageBox}>
          <div className={styles.movieIcon}>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <symbol
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                id="ic_movie_24--sprite"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M22 3H2c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h20c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1Zm-.5 4.12h-2.25V4.5h2.25v2.62ZM17.75 19.5H6.25v-6.75h11.5v6.75Zm-13-8.25H2.5V8.62h2.25v2.63Zm-2.25 1.5h2.25v2.62H2.5v-2.62Zm3.75-1.5V4.5h11.5v6.75H6.25ZM4.75 4.5v2.62H2.5V4.5h2.25ZM2.5 16.88h2.25v2.62H2.5v-2.62Zm16.75 2.62v-2.62h2.25v2.62h-2.25Zm2.25-4.12h-2.25v-2.63h2.25v2.63Zm-2.25-4.13V8.62h2.25v2.62h-2.25v.01Z"
                  clip-rule="evenodd"
                ></path>
              </symbol>
              <use xlinkHref="#ic_movie_24--sprite"></use>
            </svg>
          </div>
          <span>영화</span>
        </div>
      </section>
      {/* likeSection 내가 좋아한 코멘트 목록 */}
      <section className={styles.likeSection}>
        <h1>좋아요</h1>
        <div className={styles.commentLikeTab}>
          <span>좋아한 코멘트</span>
          <span className={styles.commentLikeCount}>{commentLikeCount}</span>
          <img
            alt="link"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDkgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNyA3TDEgMTMiIHN0cm9rZT0iI0E1QTVBQSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg=="
          />
        </div>
      </section>
    </div>
  );
}
