import { useEffect, useState } from "react";
import styles from "./Content.module.scss";
import { Carousel } from "./Carousel";
import profileDefault from "../assets/user_default.jpg";
import StarRating from "./StarRating";
import CommentCard from "./CommentCard";
import { CommentsResType, CommentType, MovieType } from "../type";
import { MyStateType } from "../type";
import { Link, useOutletContext } from "react-router-dom";
import { defaultResponseHandler } from "../apis/custom";
import { getCommentListRequest } from "../apis/comment";
import MyCommentBox from "./MyCommentBox";
import WritingModal from "./WritingModal";
import { useAuthContext } from "../contexts/authContext";
import {
  deleteWatchingState,
  postCreateWatchingState,
  putUpdateWatchingState,
} from "../apis/user";
import { OutletContextType } from "../pages/Layout";

function ContentHeader({ content }: { content: MovieType }) {
  const backGroundStyle = {
    backgroundImage: `url(https://an2-ast.amz.wtchn.net/ayg/images/asContentFallbackVideo1.207fd38cdebff49ccde8.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const genres = content.genres.map((item) => item.genre).join("/");
  const hours = Math.floor(content.runtime / 60);
  const remainingMinutes = content.runtime % 60;
  const runtime =
    hours > 0 ? `${hours}시간 ${remainingMinutes}분` : `${remainingMinutes}분`;

  return (
    <section className={styles.headerBackground} style={backGroundStyle}>
      {content && (
        <div className={styles.headerCon}>
          <h2>{content.title_ko}</h2>
          <div className={styles.headerText}>{content.title_original}</div>
          <div
            className={styles.headerText}
          >{`${content.release_date} · ${genres} · ${content.prod_country}`}</div>
          <div className={styles.headerText}>{runtime}</div>
        </div>
      )}
    </section>
  );
}

function ContentPanel({
  content,
  setContent,
  refetchContent,
}: {
  content: MovieType;
  setContent: (content: MovieType) => void;
  refetchContent: () => void;
}) {
  const [currentModal, setCurrentModal] = useState<
    "updateComment" | "createComment" | null
  >(null);
  const { setCurrentModal: setLayoutCurrentModal } =
    useOutletContext<OutletContextType>();

  const { isLogined, accessToken } = useAuthContext();
  const myState = content.my_state ?? null;

  const setMyStateHandler = (targetState: MyStateType) => {
    if (!accessToken) return;
    if (!targetState)
      return (
        content.my_state &&
        deleteWatchingState(content.my_state.id, accessToken).then(() => {
          refetchContent();
        })
      );

    if (content.my_state === null)
      return postCreateWatchingState(content.movieCD, accessToken, targetState)
        .then(defaultResponseHandler)
        .then(() => {
          refetchContent();
        });

    return putUpdateWatchingState(content.my_state.id, accessToken, targetState)
      .then(defaultResponseHandler)
      .then(() => {
        refetchContent();
      });
  };
  const rateStr = [
    "평가하기",
    "최악이에요",
    "싫어요",
    "재미없어요",
    "별로예요",
    "부족해요",
    "보통이에요",
    "볼만해요",
    "재미있어요",
    "훌륭해요!",
    "최고예요!",
  ];

  return (
    <section className={styles.panelBackground}>
      <div className={styles.panelCon}>
        <div className={styles.imageCon}>
          <img
            src={content.poster.replace("http:", "https:")}
            alt="영화 포스터"
          />
        </div>
        <main className={styles.reviewCon}>
          <nav className={styles.reviewNav}>
            <div className={styles.userRatingCon}>
              <div className={styles.starRatingBox}>
                <StarRating
                  refetchContent={refetchContent}
                  myRateData={content.my_rate}
                  movieCD={content.movieCD}
                />
              </div>
              <div className={styles.userRatingTextBox}>
                {rateStr[content.my_rate ? content.my_rate.my_rate * 2 : 0]}
              </div>
            </div>
            <div className={styles.avgRatingCon}>
              <div className={styles.avgRatingDigit}>
                {content.average_rate
                  ? content.average_rate.toFixed(1)
                  : "평가 없음"}
              </div>
              평균 평점({content.rates_count.toLocaleString("ko-KR")}명)
            </div>
            <ul className={styles.reviewMenuCon}>
              <li
                onClick={() => {
                  isLogined
                    ? myState?.my_state === "want_to_watch"
                      ? setMyStateHandler(null)
                      : setMyStateHandler("want_to_watch")
                    : setLayoutCurrentModal("login");
                }}
              >
                <div className={styles.reviewMenuIconBox}>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={
                      myState?.my_state === "want_to_watch"
                        ? styles.checked
                        : ""
                    }
                  >
                    <path d="M20.5 13.093h-7.357V20.5h-2.286v-7.407H3.5v-2.286h7.357V3.5h2.286v7.307H20.5v2.286Z"></path>
                  </svg>
                </div>
                보고싶어요
              </li>
              <li
                onClick={() => {
                  isLogined
                    ? content.my_comment !== null
                      ? setCurrentModal("updateComment")
                      : setCurrentModal("createComment")
                    : setLayoutCurrentModal("login");
                }}
              >
                <div className={styles.reviewMenuIconBox}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M3 17.253v3.75h3.75l11.06-11.06-3.75-3.75L3 17.253Zm17.71-10.21a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"></path>
                  </svg>
                </div>
                코멘트
              </li>
              <li
                onClick={() => {
                  isLogined
                    ? myState?.my_state === "watching"
                      ? setMyStateHandler(null)
                      : setMyStateHandler("watching")
                    : setLayoutCurrentModal("login");
                }}
              >
                <div className={styles.reviewMenuIconBox}>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={
                      myState?.my_state === "watching" ? styles.checked : ""
                    }
                  >
                    <path d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5Zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Z"></path>
                  </svg>
                  <div>보는 중</div>
                </div>
              </li>
            </ul>
          </nav>
          <MyCommentBox
            myRate={content.my_rate ? content.my_rate.my_rate : 0}
            closeModal={() => {
              setCurrentModal(null);
            }}
            openModal={setCurrentModal}
            content={content}
            setContent={setContent}
          />
          <div className={styles.overviewBox}>{content.plot}</div>
        </main>
      </div>
      {currentModal && accessToken && (
        <WritingModal
          title={content.title_ko}
          content={content}
          currentModal={currentModal}
          setCurrentModal={setCurrentModal}
          setContent={setContent}
        />
      )}
    </section>
  );
}

function ContentCast({ content }: { content: MovieType }) {
  return (
    <section className={styles.castCon}>
      <h2>출연/제작</h2>
      <Carousel>
        <ul>
          {content.directors.map((direct, idx) => (
            <li key={idx}>
              <div className={styles.castCard}>
                <img src={direct.photo ?? profileDefault} />
                <div
                  className={`${styles.castDescCon} ${
                    idx % 3 !== 2 ? styles.borderBottom : ""
                  }`}
                >
                  <h3 className={styles.castName}>{direct.name}</h3>
                  <p className={styles.castRole}>director</p>
                </div>
              </div>
            </li>
          ))}
          {content.castings.map((cast, idx) => (
            <li key={idx}>
              <div className={styles.castCard}>
                <img src={cast.actor.photo ?? profileDefault} />
                <div
                  className={`${styles.castDescCon} ${
                    idx % 3 !== 2 ? styles.borderBottom : ""
                  }`}
                >
                  <h3 className={styles.castName}>{cast.actor.name}</h3>
                  <p className={styles.castRole}>{cast.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Carousel>
    </section>
  );
}

function ContentComments({ content }: { content: MovieType }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentsLength, setCommentsLength] = useState<number | null>(null);
  const { accessToken } = useAuthContext();
  useEffect(() => {
    getCommentListRequest(content.movieCD, accessToken ?? undefined)
      .then(defaultResponseHandler)
      .then((data: CommentsResType) => {
        const commentsResponse = data;
        const comments = commentsResponse.results;
        setCommentsLength(comments.length);
        const repComment =
          comments.length <= 4 ? comments : comments.slice(0, 4);

        setComments(repComment);
      })
      .catch(() => alert("잘못된 요청입니다"));
  }, [content.movieCD, content.my_comment]);

  return (
    <section className={styles.commentsCon}>
      <header>
        <h2>
          코멘트 <span className={styles.commentCount}>{commentsLength}+</span>
        </h2>
        {commentsLength !== 0 && (
          <Link
            to={`/contents/${content.movieCD}/comments`}
            className={styles.moreComments}
          >
            더보기
          </Link>
        )}
      </header>
      <div className={styles.commentGridCon}>
        <ul className={styles.commentsGrid}>
          {comments.map((comment) => {
            return <CommentCard key={comment.id} comment={comment} />;
          })}
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
