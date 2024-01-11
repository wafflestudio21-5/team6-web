import styles from "./User.module.scss";
import { Link, useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();

  const {
    nickname,
    identifier,
    connect,
    likeCommentCount,
    writtenCommentCount,
    ratingCount,
  } = {
    nickname: "오수현 / 학생 / 컴퓨터공학부",
    identifier: "sh020119",
    connect: { followingCount: 100, followerCount: 20 },
    writtenCommentCount: 10,
    likeCommentCount: 3,
    ratingCount: 4,
  }; // 다음 정보는 추후 서버에서 fetching

  const myData = {
    id: "idA",
    followingId: ["idB", "idC", "idD"],
  }; // 다음 정보는 추후 userContext 등에서 가져옴

  const checkFollowing = myData?.followingId.includes(id as string); // assertion은 나중에 없앨테니 무시하셔도 됩니다.

  const pageMode: "myPage" | "otherPage" | "notLoggedIn" = !myData
    ? "notLoggedIn"
    : id === myData.id
    ? "myPage"
    : "otherPage";

  // myPage : 팔로우 버튼 보여주지 않는다 / 좋아요 섹션 보여준다
  // otherPage : 팔로우 버튼 보여준다(팔로우or언팔로우) / 좋아요 섹션 보여주지 않는다.
  // isLoggedIn : 팔로우 버튼 보여준다(무조건 팔로우) / 좋아요 섹션 보여주지 않는다.

  console.log("pageMode : ", pageMode, "checkFollowing : ", checkFollowing);

  return (
    <div className={styles.userContainer}>
      {/* profile section. user 기본 정보와 평가&코멘트 탭을 포함하는 섹션 */}
      <section className={styles.profileSection}>
        <div className={styles.setBttnBox}>
          <button className={styles.setBttn} />
        </div>
        <div className={styles.profileInfoBox}>
          <div className={styles.profilePhoto}></div>
          <h1>{nickname}</h1>
          <p>{identifier}</p>
          <div className={styles.connection}>
            <Link to="followers">
              팔로워 <span>{connect.followerCount}</span>
            </Link>
            <div className={styles.verticalLine} />
            <Link to="followings">
              팔로잉 <span>{connect.followingCount}</span>
            </Link>
          </div>
          {pageMode !== "myPage" && (
            <button
              className={`${styles.followBttn} ${
                checkFollowing && styles.unfollow
              }`}
              onClick={() => {
                //().then(()=>{toggle에 성공한 경우에만 UI에 반영한다.})
              }}
            >
              {checkFollowing ? "팔로잉" : "팔로우"}
            </button>
          )}
        </div>
        <div className={styles.userTabBox}>
          <Link to="ratings" className={styles.ratings}>
            <span className={styles.count}>{ratingCount}</span>
            <span className={styles.underLetter}>평가</span>
          </Link>
          <div className={styles.verticalLine} />
          <Link to="comments" className={styles.comments}>
            <span className={styles.count}>{writtenCommentCount}</span>
            <span className={styles.underLetter}>코멘트</span>
          </Link>
        </div>
      </section>
      {/* storageSection 영화 보관함 섹션 */}
      <section
        className={`${styles.storageSection} ${
          pageMode !== "myPage" && styles.noBottomMargin
        }`}
      >
        <h1>보관함</h1>
        <Link to="contents" className={styles.movieStorageBox}>
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
                  fillRule="evenodd"
                  d="M22 3H2c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h20c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1Zm-.5 4.12h-2.25V4.5h2.25v2.62ZM17.75 19.5H6.25v-6.75h11.5v6.75Zm-13-8.25H2.5V8.62h2.25v2.63Zm-2.25 1.5h2.25v2.62H2.5v-2.62Zm3.75-1.5V4.5h11.5v6.75H6.25ZM4.75 4.5v2.62H2.5V4.5h2.25ZM2.5 16.88h2.25v2.62H2.5v-2.62Zm16.75 2.62v-2.62h2.25v2.62h-2.25Zm2.25-4.12h-2.25v-2.63h2.25v2.63Zm-2.25-4.13V8.62h2.25v2.62h-2.25v.01Z"
                  clipRule="evenodd"
                ></path>
              </symbol>
              <use xlinkHref="#ic_movie_24--sprite"></use>
            </svg>
          </div>
          <span>영화</span>
        </Link>
      </section>
      {/* likeSection 내가 좋아한 코멘트 목록 섹션 */}
      {pageMode === "myPage" && (
        <section className={styles.likeSection}>
          <h1>좋아요</h1>
          <Link to="likes" className={styles.commentLikeTab}>
            <span>좋아한 코멘트</span>
            <span className={styles.likeCommentCount}>{likeCommentCount}</span>
            <img
              alt="link"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDkgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNyA3TDEgMTMiIHN0cm9rZT0iI0E1QTVBQSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg=="
            />
          </Link>
        </section>
      )}
    </div>
  );
}
