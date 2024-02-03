import { CommentType } from "../type";

import styles from "./CommentCard.module.scss";
import profileDefault from "../assets/user_default.jpg";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { OutletContextType } from "../pages/Layout";
import { postToggleCommentLike } from "../apis/comment";
import { defaultResponseHandler } from "../apis/custom";

export default function CommentCard({ comment }: { comment: CommentType }) {
  // user 하위 페이지에서 코멘트를 불러오는 경우, movie의 정보를 이용해야 한다.
  const { accessToken } = useAuthContext();
  const { setCurrentModal } = useOutletContext<OutletContextType>();
  const likeExceptMe =
    (comment.like_count ?? comment.likes_count) -
    (comment.liked_by_user ? 1 : 0);
  const [likeByMe, setLikeByMe] = useState(comment.liked_by_user);
  const [likeGoing, setLikeGoing] = useState(false);
  const [spoiler, setSpoiler] = useState(comment.has_spoiler);
  const inContentPage = /^\/contents\/\d+$/.test(location.pathname);

  const likeClicked = () => {
    if (!accessToken) {
      setCurrentModal("login");
      return;
    }
    setLikeGoing(true);
    postToggleCommentLike(comment.id, accessToken)
      .then(defaultResponseHandler)
      .then(() => {
        setLikeByMe(!likeByMe);
        setLikeGoing(false);
      })
      .catch((e) => {
        setLikeGoing(false);
        console.log(e);
      });
  };

  return (
    <li className={styles.cardCon}>
      <div className={styles.commentHead}>
        <Link to={`/users/${comment.created_by.id}`} className={styles.userBox}>
          <img src={comment.created_by.profile_photo ?? profileDefault} />
          {comment.created_by.nickname}
        </Link>
        {comment.rating && (
          <div className={styles.reviewRating}>
            <svg
              viewBox="0 0 44 44"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 33.444L9.83 42.327c-.784.572-1.842-.196-1.539-1.118l4.687-14.32L.769 18.06c-.787-.569-.383-1.812.588-1.81l15.067.033 4.624-14.34c.298-.924 1.606-.924 1.904 0l4.624 14.34 15.067-.033c.971-.002 1.375 1.241.588 1.81l-12.209 8.829 4.688 14.32c.302.922-.756 1.69-1.54 1.118L22 33.444z"></path>
            </svg>
            {comment.rating.rate.toFixed(1)}
          </div>
        )}
      </div>
      <div
        className={
          styles.commentContentContainer +
          (inContentPage ? " " + styles.inContentPage : "")
        }
      >
        <CommentContentBox
          comment={comment}
          spoiler={spoiler}
          setSpoiler={setSpoiler}
        />
      </div>

      <div className={styles.commentFeedbackCon}>
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzc4Nzg3OCI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik02Ljc1IDkuNDg1aC0zYTEgMSAwIDAgMC0xIDF2MTBhMSAxIDAgMCAwIDEgMWgzYTEgMSAwIDAgMCAxLTF2LTEwYTEgMSAwIDAgMC0xLTFNMjAuNjU3IDguNTY2YTIuMzYzIDIuMzYzIDAgMCAwLTEuNzc5LS44MTNIMTYuNjJsLjE2NC0uNjI3Yy4xMzctLjUyOC4yMDEtMS4xMi4yMDEtMS44NjMgMC0xLjkxOS0xLjM3NS0yLjc3OC0yLjczOC0yLjc3OC0uNDQ0IDAtLjc2Ni4xMjMtLjk4Ni4zNzYtLjIuMjI3LS4yODIuNTMtLjI0My45MzVsLjAzIDEuMjMtMi45MDMgMi45NGMtLjU5My42LS44OTQgMS4yMy0uODk0IDEuODcydjkuNjQ3YS41LjUgMCAwIDAgLjUuNWg3LjY4N2EyLjM4OCAyLjM4OCAwIDAgMCAyLjM0OC0yLjA3bDEuNDQ1LTcuNDUyYTIuNDQgMi40NCAwIDAgMC0uNTc0LTEuODk3Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
          alt=""
        />
        {likeExceptMe + (likeByMe ? 1 : 0)}
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiM3ODc4NzgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkuODU3IDE3Ljc4Nkw2IDIxdi00LjkxYy0xLjg0MS0xLjM3My0zLTMuMzY5LTMtNS41OUMzIDYuMzU4IDcuMDMgMyAxMiAzczkgMy4zNTggOSA3LjVjMCA0LjE0Mi00LjAzIDcuNS05IDcuNS0uNzM5IDAtMS40NTYtLjA3NC0yLjE0My0uMjE0eiIvPgo8L3N2Zz4K"
          alt=""
        />
        {comment.reply_count}
      </div>
      <div className={styles.commentLikeBtnBox}>
        <button
          className={likeByMe ? styles.liked : ""}
          disabled={spoiler || likeGoing}
          onClick={likeClicked}
        >
          좋아요
        </button>
      </div>
    </li>
  );
}

function CommentContentBox({
  comment,
  spoiler,
  setSpoiler,
}: {
  comment: CommentType;
  spoiler: boolean;
  setSpoiler: (s: boolean) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const onHiddenMoviedata = window.location.pathname.includes("contents");
  const inContentPage = /^\/contents\/\d+$/.test(location.pathname);

  return (
    <>
      {!onHiddenMoviedata && (
        <div className={styles.posterBox}>
          <img
            src={comment.movie.poster.replace("http:", "https:")}
            alt={comment.movie.title_ko}
            onClick={() => {
              navigate(`/contents/${comment.movie.movieCD}`);
            }}
          />
        </div>
      )}
      <div className={styles.commentTextBox}>
        <div
          className={
            styles.commentText +
            (inContentPage ? " " + styles.inContentPage : "")
          }
        >
          {!onHiddenMoviedata && (
            <p
              className={styles.movieTitle}
              onClick={() => {
                navigate(`/contents/${comment.movie.movieCD}`);
              }}
            >
              {comment.movie.title_ko}{" "}
            </p>
          )}
          {!onHiddenMoviedata && (
            <p
              className={styles.movieYear}
              onClick={() => {
                navigate(`/contents/${comment.movie.movieCD}`);
              }}
            >
              영화 · {new Date(comment.movie.release_date).getFullYear()}
            </p>
          )}
          {spoiler ? (
            <div className={styles.spoiler}>
              이 코멘트에는 스포일러가 있습니다.{" "}
              <button
                onClick={() => {
                  setSpoiler(false);
                }}
              >
                보기
              </button>
            </div>
          ) : (
            <span
              onClick={() => {
                navigate(`/comments/${comment.id}`);
              }}
            >
              {comment.content}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
