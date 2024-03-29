import profileDefault from "../assets/user_default.jpg";
import { Link, useOutletContext, useParams } from "react-router-dom";
import styles from "./CommentInfo.module.scss";
import ReplyList from "./ReplyList";
import elapsedTime from "../utils/elapsedTime";
import { CommentType } from "../type";
import { useEffect, useState } from "react";

import { defaultResponseHandler } from "../apis/custom";
import { ReplyType } from "../type";
import CommentPageWriteModal from "./CommentPageWriteModal";
import { postToggleCommentLike } from "../apis/comment";
import { useAuthContext } from "../contexts/authContext";
import { getCommentReplies } from "../apis/comment";
import DeleteComReplyModal from "./DeleteComReplyModal";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { OutletContextType } from "../pages/Layout";

function CommentHeader({ comment }: { comment: CommentType }) {
  const { movie, rating, created_by, created_at } = comment;

  return (
    <div className={styles.commentHeader}>
      <div className={styles.commentUser}>
        <Link
          className={styles.userLink}
          to={`/users/${created_by.id}`}
          title={created_by.nickname}
        >
          <div className={styles.userImage}>
            <img
              src={created_by.profile_photo ?? profileDefault}
              alt={created_by.nickname + "의 사진"}
            />
          </div>
          <div className={styles.userDate}>
            <div className={styles.userName}>{created_by.nickname}</div>
            <div className={styles.date}>
              {elapsedTime(new Date(created_at))}
            </div>
          </div>
        </Link>
        {movie && (
          <Link to={`/contents/${movie.movieCD}`}>
            <div className={styles.movieName}>{movie.title_ko}</div>
            <div className={styles.releaseYear}>
              영화 · {new Date(movie.release_date).getFullYear()}
            </div>
          </Link>
        )}
        {rating && (
          <div className={styles.ratingDiv}>
            <div className={styles.rating}>
              <img
                width="16px"
                height="16px"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiM0QTRBNEEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDE3Ljk4bC02LjAxNSA0LjM5MmMtLjUwOC4zNzItMS4xOTQtLjEyNi0uOTk4LS43MjVsMi4zMTctNy4wODEtNi4wMzUtNC4zNjdjLS41MS0uMzY5LS4yNDctMS4xNzUuMzgyLTEuMTc0bDcuNDQ3LjAxNiAyLjI4Ni03LjA5MWMuMTkyLS42IDEuMDQtLjYgMS4yMzMgMGwyLjI4NiA3LjA5IDcuNDQ3LS4wMTVjLjYyOS0uMDAxLjg5LjgwNS4zOCAxLjE3NGwtNi4wMzMgNC4zNjcgMi4zMTYgNy4wOGMuMTk2LjYtLjQ5IDEuMDk4LS45OTkuNzI2TDEyIDE3Ljk4eiIvPgo8L3N2Zz4K"
                alt="star"
              />

              <span className={styles.ratingText}>
                {rating.rate.toFixed(1)}
              </span>
            </div>
          </div>
        )}
      </div>
      {movie && (
        <Link to={`/contents/${movie.movieCD}`} title={movie.title_ko}>
          <div className={styles.poster}>
            <img
              src={movie.poster.replace("http:", "https:")}
              alt={movie.title_ko + "의 포스터"}
            />
          </div>
        </Link>
      )}
    </div>
  );
}

function CommentBody({ comment }: { comment: CommentType }) {
  const [preventWatchSpoiler, setPreventWatchSpoiler] = useState<boolean>(
    comment.has_spoiler,
  );

  if (preventWatchSpoiler)
    return (
      <div className={styles.commentBody}>
        이 코멘트에는 스포일러가 있습니다.{" "}
        <button
          onClick={() => {
            setPreventWatchSpoiler(false);
          }}
        >
          보기
        </button>
      </div>
    );
  return <div className={styles.commentBody}>{comment.content}</div>;
}

function CommentLikeReply({
  setUpdateModal,
  setDeleteModal,
  likes,
  replies,
  comment,
}: {
  likes: number;
  replies: number;
  setUpdateModal: () => void;
  setDeleteModal: () => void;
  comment: CommentType;
}) {
  const { myUserData } = useAuthContext();

  return (
    <div className={styles.commentLikeReply}>
      <span className={styles.likes}>좋아요 {likes}</span>
      <span>댓글 {replies}</span>
      <div
        className={styles.editDeleteBox}
        style={{
          visibility:
            myUserData?.id === comment.created_by.id ? "visible" : "hidden",
        }}
      >
        <button
          className={styles.editButton}
          onClick={() => {
            setUpdateModal();
          }}
        >
          <MdEdit /> 수정
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => {
            setDeleteModal();
          }}
        >
          <RiDeleteBin6Line /> 삭제
        </button>
      </div>
    </div>
  );
}

function LikeReplyBar({
  liked: likeChecked,
  setCurrentModalState,
  refetchComment,
}: {
  liked: boolean;
  setCurrentModalState: (
    value:
      | { type: "createReply" }
      | { type: "updateReply"; targetReply: ReplyType },
  ) => void;
  refetchComment: () => void;
}) {
  const { isLogined, accessToken } = useAuthContext();
  const { setCurrentModal } = useOutletContext<OutletContextType>();
  const { id: commentId } = useParams();

  return (
    <section className={styles.likeReplyBar}>
      <hr />
      <div className={styles.likeReplyGrid}>
        <button
          onClick={() => {
            if (!accessToken) {
              setCurrentModal("login");
              return;
            }
            if (!commentId) return;
            postToggleCommentLike(parseInt(commentId), accessToken)
              .then(defaultResponseHandler)
              .then(() => {
                refetchComment();
              })
              .catch(() => {
                alert("실패");
              });
          }}
          className={
            styles.likeButton +
            (likeChecked ? " " + styles.likeButtonLiked : "")
          }
        >
          {likeChecked ? (
            <svg className={styles.likeSvg} fill="#ff2f6e" viewBox="0 0 20 20">
              <path
                className={styles.fillTarget}
                clipRule="evenodd"
                d="M5.6252 7.90479H3.1252C2.6652 7.90479 2.29187 8.27812 2.29187 8.73812V17.0715C2.29187 17.5315 2.6652 17.9048 3.1252 17.9048H5.6252C6.08604 17.9048 6.45854 17.5315 6.45854 17.0715V8.73812C6.45854 8.27812 6.08604 7.90479 5.6252 7.90479Z"
                fill="#FF2F6E"
                fillRule="evenodd"
              ></path>
              <path
                className={styles.fillTarget}
                clipRule="evenodd"
                d="M17.2146 7.13879C16.8388 6.70796 16.2979 6.46129 15.7321 6.46129H13.8504L13.9871 5.93879C14.1013 5.49879 14.1546 5.00546 14.1546 4.38629C14.1546 2.78712 13.0088 2.07129 11.8729 2.07129C11.5029 2.07129 11.2346 2.17379 11.0513 2.38462C10.8846 2.57379 10.8163 2.82546 10.8488 3.16379L10.8738 4.18879L8.45459 6.63796C7.96043 7.13879 7.70959 7.66379 7.70959 8.19879V16.238C7.70959 16.4671 7.89626 16.6546 8.12626 16.6546H14.5321C15.5088 16.6546 16.3663 15.908 16.4888 14.9288L17.6929 8.71962C17.7646 8.14712 17.5888 7.57129 17.2146 7.13879Z"
                fill="#FF2F6E"
                fillRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg className={styles.likeSvg} viewBox="0 0 20 20">
              <path
                className={styles.fillTarget}
                clipRule="evenodd"
                d="M5.6252 7.9043H3.1252C2.6652 7.9043 2.29187 8.27763 2.29187 8.73763V17.071C2.29187 17.531 2.6652 17.9043 3.1252 17.9043H5.6252C6.08604 17.9043 6.45854 17.531 6.45854 17.071V8.73763C6.45854 8.27763 6.08604 7.9043 5.6252 7.9043Z"
                fill="#87898B"
                fillRule="evenodd"
              ></path>
              <path
                className={styles.fillTarget}
                clipRule="evenodd"
                d="M11.71 4.34525L11.7017 3.99359L11.6825 3.14525L11.6809 3.09692L11.6759 3.04942C11.6684 2.96942 11.6792 2.93442 11.6775 2.93275C11.6917 2.92442 11.7534 2.90442 11.8725 2.90442C12.115 2.90442 13.3225 2.97609 13.3225 4.38692C13.3225 4.93359 13.2775 5.35859 13.1809 5.72692L12.8375 7.03275C12.8034 7.16525 12.9025 7.29442 13.0392 7.29442H14.3892H15.7317C16.0575 7.29442 16.3684 7.43692 16.585 7.68442C16.7975 7.93025 16.9009 8.25609 16.87 8.58275L15.6717 14.7703L15.6634 14.8119L15.6584 14.8536C15.59 15.3961 15.0959 15.8211 14.5334 15.8211H8.54169V8.19942C8.54169 7.89109 8.71169 7.56275 9.04835 7.22359L11.3417 4.90025L11.5775 4.66109C11.71 4.52359 11.71 4.34525 11.71 4.34525ZM17.5275 6.86525C17.0734 6.34275 16.4184 6.04442 15.7317 6.04442H14.3892C14.5167 5.56025 14.5725 5.02942 14.5725 4.38692C14.5725 2.50942 13.1734 1.65442 11.8725 1.65442C11.3825 1.65442 11 1.80775 10.7367 2.11025C10.5667 2.30359 10.3792 2.64442 10.4325 3.17359L10.4517 4.02192L8.15835 6.34525C7.58335 6.92692 7.29169 7.55109 7.29169 8.19942V16.2378C7.29169 16.6978 7.66502 17.0711 8.12502 17.0711H14.5334C15.7342 17.0711 16.7559 16.1603 16.8992 15.0078L18.1067 8.77192C18.1925 8.08109 17.9809 7.38692 17.5275 6.86525Z"
                fill="#87898B"
                fillRule="evenodd"
              ></path>
            </svg>
          )}
          좋아요
        </button>
        <button
          onClick={() => {
            if (!isLogined) {
              setCurrentModal("login");
              return;
            }
            setCurrentModalState({ type: "createReply" });
          }}
        >
          <svg viewBox="0 0 20 20" className="css-b7lu23-IcCommentSvg e4ahphr0">
            <path
              className={styles.fillTarget}
              clipRule="evenodd"
              d="M9.99963 2.08325C5.65046 2.08325 2.12546 5.02159 2.12546 8.64575C2.12546 10.5891 3.13962 12.3358 4.74962 13.5374L4.61129 17.2416C4.61129 17.4899 4.81462 17.6591 5.03046 17.6591C5.12129 17.6591 5.21462 17.6291 5.29462 17.5616L8.12462 15.0208C8.72629 15.1433 9.35379 15.2083 9.99963 15.2083C14.3496 15.2083 17.8746 12.2699 17.8746 8.64575C17.8746 5.02159 14.3496 2.08325 9.99963 2.08325ZM9.99962 3.33325C13.653 3.33325 16.6246 5.71659 16.6246 8.64575C16.6246 11.5749 13.653 13.9583 9.99962 13.9583C9.44962 13.9583 8.90296 13.9041 8.37379 13.7966C8.29129 13.7791 8.20796 13.7708 8.12462 13.7708C7.81962 13.7708 7.52046 13.8833 7.28962 14.0908L5.93462 15.3074L5.99879 13.5841C6.01462 13.1733 5.82712 12.7808 5.49796 12.5349C4.14879 11.5291 3.37546 10.1116 3.37546 8.64575C3.37546 5.71659 6.34712 3.33325 9.99962 3.33325Z"
              fill="#87898B"
              fillRule="evenodd"
            ></path>
          </svg>
          댓글
        </button>
      </div>
      <hr />
    </section>
  );
}

export type CurrentModalStateType =
  | { type: "deleteComment"; targetComment: CommentType }
  | { type: "updateComment"; targetComment: CommentType }
  | { type: "createReply" }
  | { type: "updateReply"; targetReply: ReplyType }
  | { type: "deleteReply"; targetReply: ReplyType }
  | null;

export default function CommentInfo({
  comment,
  refetchComment,
  setComment,
}: {
  comment: CommentType;
  setComment: (value: CommentType) => void;
  refetchComment: () => void;
}) {
  const [currentModalState, setCurrentModalState] =
    useState<CurrentModalStateType>(null);

  const { id: commentId } = useParams();
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const { accessToken } = useAuthContext();
  const [nextRepliesUrl, setNextRepliesUrl] = useState<string | null>(null); // 업로드한 댓글 ui에 반영하기 위해서는 commentInfo에 다음 state들이 있어야 함.

  useEffect(() => {
    if (!commentId) return;

    getCommentReplies(parseInt(commentId), accessToken ?? undefined)
      .then(defaultResponseHandler)
      .then((data) => {
        const repliesResponse = data;
        setReplies(repliesResponse.results);
        setNextRepliesUrl(repliesResponse.next);
      })
      .catch(() => alert("잘못된 요청입니다"));
  }, [commentId, accessToken]);

  // 무한스크롤 페이지네이션 특성상 단순히 데이터 리패칭을 할 수 없음 따라서 state를 직접 변경한다.
  const deleteReplyState = (replyId: number) => {
    setReplies(replies.filter((reply) => reply.id !== replyId));
    setComment({ ...comment, reply_count: comment.reply_count - 1 });
  };
  const updateReplyState = (resonseReply: ReplyType) => {
    const { id: responseId } = resonseReply;
    setReplies(
      replies.map((reply) => (reply.id === responseId ? resonseReply : reply)),
    );
  };
  const addReplyState = (reply: ReplyType) => {
    setReplies([reply, ...replies]);
    setComment({ ...comment, reply_count: comment.reply_count + 1 });
  };

  return (
    <section className={styles.commentInfo}>
      {currentModalState &&
        (currentModalState.type === "createReply" ||
          currentModalState.type === "updateComment" ||
          currentModalState.type === "updateReply") && (
          <CommentPageWriteModal
            addReply={addReplyState}
            updateReply={updateReplyState}
            setCurrentModal={setCurrentModalState}
            refetchComment={refetchComment}
            currentModalState={currentModalState}
          />
        )}

      {currentModalState &&
        (currentModalState.type === "deleteReply" ||
          currentModalState.type === "deleteComment") && (
          <DeleteComReplyModal
            currentModalState={currentModalState}
            setCurrentModalState={setCurrentModalState}
            deleteReplyState={deleteReplyState}
          />
        )}

      <CommentHeader comment={comment} />

      <CommentBody comment={comment} />
      <CommentLikeReply
        comment={comment}
        setUpdateModal={() => {
          setCurrentModalState({
            type: "updateComment",
            targetComment: comment,
          });
        }}
        setDeleteModal={() => {
          setCurrentModalState({
            type: "deleteComment",
            targetComment: comment,
          });
        }}
        likes={comment.like_count}
        replies={comment.reply_count}
      />
      <LikeReplyBar
        refetchComment={refetchComment}
        liked={comment.liked_by_user}
        setCurrentModalState={setCurrentModalState}
      />

      <ReplyList
        openUpdateModal={(reply: ReplyType) => {
          setCurrentModalState({ type: "updateReply", targetReply: reply });
        }}
        openDeleteReplyModal={(reply: ReplyType) => {
          setCurrentModalState({ type: "deleteReply", targetReply: reply });
        }}
        {...{ comment, setReplies, replies, nextRepliesUrl, setNextRepliesUrl }}
      />
    </section>
  );
}
