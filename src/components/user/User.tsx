// import { useEffect } from "react";
import { useAuthContext } from "../../contexts/authContext";
import styles from "./User.module.scss";
import { Link, useParams } from "react-router-dom";
import { OutletContextType } from "../../pages/Layout";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetail } from "../../apis/user";
import { defaultResponseHandler } from "../../apis/custom";
import { UserDataType } from "../../type";
import { FollowListType } from "../../type";
import { getFollowingList } from "../../apis/user";
import { postAddFollow, postUnFollow } from "../../apis/user";
import useChangeTitle from "../../hooks/useChangeTitle";
import profileDefault from "../../assets/user_default.jpg";

export default function User() {
  const { setCurrentModal } = useOutletContext<OutletContextType>();
  const { myUserData, accessToken } = useAuthContext();
  const loginUserId = myUserData?.id;
  const { id: pageUserId } = useParams();

  const pageMode = !loginUserId
    ? "notLoggedIn"
    : pageUserId === loginUserId.toString()
      ? "myPage"
      : "otherPage";
  // myPage : 팔로우 버튼 보여주지 않는다 / 좋아요 섹션 보여준다
  // otherPage : 팔로우 버튼 보여준다(팔로우or언팔로우) / 좋아요 섹션 보여주지 않는다.
  // isLoggedIn : 팔로우 버튼 보여준다(무조건 팔로우) / 좋아요 섹션 보여주지 않는다.
  const { setTitle } = useChangeTitle();
  const [pageUser, setPageUser] = useState<UserDataType | null>(null); // PageUserType은 아래에 정의되어 있습니다.
  const [pageUserloading, setPageUserLoading] = useState(true);
  const [isMyFollowing, setIsMyFollowing] = useState<boolean>(false);
  const [isMyFollowingLoading, setIsMyFollowingLoading] = useState(true);
  const loading = pageUserloading || isMyFollowingLoading;

  const followButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!pageUser) return;
    if (!accessToken) return setCurrentModal("login");
    isMyFollowing
      ? postUnFollow(accessToken, pageUser.id)
          .then(defaultResponseHandler)
          .then(() => {
            setIsMyFollowing(false);
          })
          .catch(() => {
            console.log("팔로우 취소 실패");
          })
      : postAddFollow(accessToken, pageUser.id)
          .then(defaultResponseHandler)
          .then(() => {
            setIsMyFollowing(true);
          })
          .catch(() => {
            console.log("팔로우 실패");
          });
  };

  // 페이지 유저 데이터 가져오기
  useEffect(() => {
    pageUserId &&
      getUserDetail(parseInt(pageUserId))
        .then(defaultResponseHandler)
        .then((data: UserDataType) => {
          setTitle(
            data.nickname
              ? `${data.nickname}님의 프로필 페이지 - 와플피디아`
              : "와플피디아 - 영화 평가 서비스",
          );
          setPageUser(data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setPageUserLoading(false);
        });
  }, [pageUserId, myUserData]);

  // 유저데이터에 팔로잉 리스트가 없어서 추가로 가져와야 함

  useEffect(() => {
    if (!myUserData) return setIsMyFollowingLoading(false);

    getFollowingList(myUserData.id)
      .then(defaultResponseHandler)
      .then((data: FollowListType) => {
        const myFollowingIdList = data.map((follower) => follower.id);
        const isMyFollowing =
          !!pageUserId && myFollowingIdList.includes(parseInt(pageUserId));

        setIsMyFollowing(isMyFollowing);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsMyFollowingLoading(false);
      });
  }, [pageUserId]);

  const backgoundStyle = {
    backgroundImage: `url(${pageUser?.background_photo ?? ""})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div className={styles.userContainer}>
      {!loading && pageUser && (
        <>
          {/* profile section. user 기본 정보와 평가&코멘트 탭을 포함하는 섹션 */}
          <section className={styles.profileSection}>
            <div
              className={styles.backgroundPhoto}
              style={backgoundStyle}
            ></div>
            <div className={styles.setBttnBox}>
              {pageMode === "myPage" && (
                <button
                  className={styles.setBttn}
                  onClick={() => {
                    setCurrentModal("setting");
                  }}
                />
              )}
            </div>
            <div className={styles.profileInfoBox}>
              <img
                src={pageUser.profile_photo ?? profileDefault}
                className={styles.profilePhoto}
              />
              <h1>{pageUser.nickname}</h1>
              <p>{pageUser.username}</p>
              <div className={styles.connection}>
                <Link to="followers">
                  <span>팔로워 {pageUser.followers_count}</span>
                </Link>
                <div className={styles.verticalLine} />
                <Link to="followings">
                  <span>팔로잉 {pageUser.following_count}</span>
                </Link>
              </div>
              <p>{pageUser.bio}</p>
              {pageMode === "myPage" ? (
                <button
                  className={styles.userEditBttn}
                  onClick={() => setCurrentModal("userEdit")}
                >
                  프로필 수정
                </button>
              ) : (
                <button
                  className={`${styles.followBttn} ${
                    isMyFollowing && styles.unfollow
                  }`}
                  onClick={followButtonClickHandler}
                >
                  {isMyFollowing ? "팔로잉" : "팔로우"}
                </button>
              )}
            </div>

            <div className={styles.userTabBox}>
              <Link to="ratings" className={styles.ratings}>
                <span className={styles.count}>{pageUser.rate_num}</span>
                <span className={styles.underLetter}>평가</span>
              </Link>
              <div className={styles.verticalLine} />
              <Link to="comments" className={styles.comments}>
                <span className={styles.count}>{pageUser.comment_num}</span>
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
                <span className={styles.likeCommentCount}>
                  {pageUser.liked_comment_num}
                </span>
                <img
                  alt="link"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDkgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNyA3TDEgMTMiIHN0cm9rZT0iI0E1QTVBQSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg=="
                />
              </Link>
            </section>
          )}
        </>
      )}
    </div>
  );
}
